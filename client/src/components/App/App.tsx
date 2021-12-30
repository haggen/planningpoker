import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";
import update from "immutability-helper";
import useWebSocket from "react-use-websocket";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";
import { useStoredState } from "src/hooks/useStoredState";

export enum GamePhase {
  Voting,
  Reveal,
}

type Player = {
  id: string;
  name: string;
  vote: string;
};

type State = {
  phase: GamePhase;
  players: Player[];
};

type ContextValue = State & {
  id: string | undefined;
  currentPlayer: Player | undefined;
  dispatch: Dispatch<Action>;
};

type Action =
  | {
      type: "reveal";
    }
  | {
      type: "restart";
    }
  | {
      type: "changePlayerVote";
      payload: {
        id: string;
        vote: string;
      };
    }
  | {
      type: "changePlayerName";
      payload: {
        id: string;
        name: string;
      };
    }
  | {
      type: "addPlayer";
      payload: {
        id: string;
        name: string;
        vote: string;
      };
    }
  | {
      type: "sync";
      payload?: State;
    };

const defaultState = {
  phase: GamePhase.Voting,
  players: [],
};

const Context = createContext<ContextValue>({
  id: undefined,
  currentPlayer: undefined,
  dispatch: () => {},
  ...defaultState,
});

export const useGameState = () => {
  return useContext(Context);
};

const createGameId = () => {
  return nanoid(10);
};

const createPlayerId = () => {
  return nanoid(10);
};

export const promptPlayerName = () => {
  const name = prompt("Qual seu nome?");
  if (name) {
    return name;
  }
  return "Anônimo";
};

const reducer = (state: State, action: Action) => {
  if (action.type === "reveal") {
    return update(state, { phase: { $set: GamePhase.Reveal } });
  } else if (action.type === "sync") {
    if (!action.payload) {
      return state;
    }
    return update(state, {
      phase: { $set: action.payload.phase },
      players: { $push: action.payload.players },
    });
  } else if (action.type === "restart") {
    return update(state, {
      phase: { $set: GamePhase.Voting },
      players: {
        $set: state.players.map((player) => ({ ...player, vote: "" })),
      },
    });
  } else if (action.type === "addPlayer") {
    return update(state, { players: { $push: [action.payload] } });
  } else if (action.type === "changePlayerName") {
    const playerIndex = state.players.findIndex(
      (player) => player.id === action.payload.id
    );
    if (playerIndex < 0) {
      return state;
    }
    return update(state, {
      players: {
        [playerIndex]: { name: { $set: action.payload.name } },
      },
    });
  } else if (action.type === "changePlayerVote") {
    const playerIndex = state.players.findIndex(
      (player) => player.id === action.payload.id
    );
    if (playerIndex < 0) {
      return state;
    }
    return update(state, {
      players: {
        [playerIndex]: { vote: { $set: action.payload.vote } },
      },
    });
  } else {
    return state;
  }
};

export const App = () => {
  const [playerId] = useStoredState("playerId", createPlayerId);
  const [state, reducerDispatch] = useReducer(reducer, defaultState);
  const [match, params] = useRoute("/:gameId");
  const [, setLocation] = useLocation();

  const { gameId } = params ?? {};

  const { sendJsonMessage: webSocketDispatch, readyState } = useWebSocket(
    match ? `${process.env.REACT_APP_API_URL}/${gameId}` : "",
    {
      onMessage(event) {
        const action = JSON.parse(event.data);
        if (action.type === "sync" && !action.payload) {
          webSocketDispatch({ type: "sync", payload: state });
        }
        reducerDispatch(action);
      },
    }
  );

  const { players } = state;
  const currentPlayer = players.find((player) => player.id === playerId);

  const dispatch = useCallback(
    (action: Action) => {
      reducerDispatch(action);
      webSocketDispatch(action);
    },
    [webSocketDispatch]
  );

  useEffect(() => {
    if (!match) {
      setLocation("/" + createGameId(), { replace: true });
    }
  }, [match, setLocation]);

  useEffect(() => {
    if (!playerId) {
      return;
    }

    if (readyState !== WebSocket.OPEN) {
      return;
    }

    if (!currentPlayer) {
      dispatch({
        type: "addPlayer",
        payload: {
          id: playerId,
          name: promptPlayerName(),
          vote: "",
        },
      });
    }
  }, [readyState, playerId, currentPlayer, dispatch]);

  return (
    <Context.Provider value={{ id: gameId, currentPlayer, dispatch, ...state }}>
      <Layout>
        <Header />
        <Content />
        <Deck />
      </Layout>
    </Context.Provider>
  );
};

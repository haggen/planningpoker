import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";

export enum GamePhase {
  Voting,
  Reveal,
}

type State = {
  phase: GamePhase;
  playerName: string;
};

type ContextValue = State & {
  id: string | undefined;
  dispatch: Dispatch<Action>;
};

type Action =
  | {
      type: "changePhase";
      payload: GamePhase;
    }
  | {
      type: "changePlayerName";
      payload: string;
    };

const defaultState = {
  phase: GamePhase.Voting,
  playerName: "",
};

const Context = createContext<ContextValue>({
  id: undefined,
  dispatch: () => {},
  ...defaultState,
});

export const useGameState = () => {
  return useContext(Context);
};

const createGameId = () => {
  return nanoid(10);
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "changePhase":
      return {
        ...state,
        phase: action.payload,
      };
    case "changePlayerName":
      return {
        ...state,
        playerName: action.payload,
      };
    default:
      return state;
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [match, params] = useRoute("/:gameId");
  const [, setLocation] = useLocation();

  const { gameId } = params ?? {};
  const { playerName } = state;

  useEffect(() => {
    if (!match) {
      setLocation("/" + createGameId(), { replace: true });
    }
  }, [match, setLocation]);

  useEffect(() => {
    if (!playerName) {
      dispatch({
        type: "changePlayerName",
        payload: prompt("Qual seu nome?") ?? "",
      });
    }
  }, [playerName, dispatch]);

  return (
    <Context.Provider value={{ id: gameId, dispatch, ...state }}>
      <Layout>
        <Header />
        <Content />
        <Deck />
      </Layout>
    </Context.Provider>
  );
};

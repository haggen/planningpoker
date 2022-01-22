import { createContext, Dispatch, useContext, useEffect } from "react";
import update from "immutability-helper";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";

export enum Phase {
  Voting,
  Reveal,
}

export type Player = {
  id: string;
  name: string;
  vote: string;
  createdAt: number;
};

type State = {
  phase: Phase;
  players: Player[];
};

type Value = State & {
  gameId: string | undefined;
  isConnected: boolean;
  dispatch: Dispatch<Action>;
};

export type Action =
  | {
      type: "game/reveal";
    }
  | {
      type: "game/restart";
    }
  | {
      type: "player/add";
      payload: Player;
    }
  | {
      type: "player/remove";
      payload: {
        id: string;
      };
    }
  | {
      type: "player/vote";
      payload: {
        id: string;
        vote: string;
      };
    }
  | {
      type: "player/rename";
      payload: {
        id: string;
        name: string;
      };
    }
  | {
      type: "sync";
      payload?: State;
    };

const createGameId = () => {
  return nanoid(10);
};

const createPlayerId = () => {
  return nanoid(10);
};

export const useGameId = () => {
  const [match, params] = useRoute("/:gameId");
  const [, setLocation] = useLocation();

  const { gameId } = params ?? {};

  useEffect(() => {
    if (!match) {
      setLocation("/" + createGameId(), { replace: true });
    }
  }, [match, setLocation]);

  return gameId;
};

export const promptPlayerName = () => {
  const name = prompt("Qual seu nome?");
  if (name) {
    return name;
  }
  return "Anônimo";
};

const playerDataKey = "player";

export const getSavedPlayerData = () => {
  const profile = localStorage.getItem(playerDataKey);
  if (profile) {
    return JSON.parse(profile);
  }
  return {
    id: createPlayerId(),
    name: promptPlayerName(),
    vote: "",
    createdAt: Date.now(),
  };
};

export const savePlayerData = (player: Player) => {
  localStorage.setItem(playerDataKey, JSON.stringify(player));
};

export const defaultState = {
  phase: Phase.Voting,
  players: [],
};

export const Context = createContext<Value>({
  gameId: undefined,
  isConnected: false,
  dispatch: () => {},
  ...defaultState,
});

export const useGameState = () => {
  return useContext(Context);
};

export const reducer = (state: State, action: Action) => {
  let playerIndex;

  console.log(action);

  switch (action.type) {
    case "game/reveal":
      return update(state, { phase: { $set: Phase.Reveal } });
    case "sync":
      if (!action.payload) {
        return state;
      }
      return update(state, {
        phase: { $set: action.payload.phase },
        players: (players) => {
          action.payload?.players.forEach((player) => {
            const index = players.findIndex(({ id }) => id === player.id);
            if (index === -1) {
              players.push(player);
            }
          });
          return players;
        },
      });
    case "game/restart":
      return update(state, {
        phase: { $set: Phase.Voting },
        players: {
          $set: state.players.map((player) => ({ ...player, vote: "" })),
        },
      });
    case "player/add":
      playerIndex = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (playerIndex > -1) {
        return state;
      }
      return update(state, { players: { $push: [action.payload] } });
    case "player/remove":
      return update(state, {
        players: (players) =>
          players.filter((player) => player.id !== action.payload.id),
      });
    case "player/rename":
      playerIndex = state.players.findIndex(
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
    case "player/vote":
      playerIndex = state.players.findIndex(
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
    default:
      return state;
  }
};

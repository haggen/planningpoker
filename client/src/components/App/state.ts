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
  vote: undefined | number | "?";
  createdAt: number;
};

type State = {
  phase: Phase;
  playerId: string;
  players: Record<string, Player>;
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
        vote: Player["vote"];
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

const createPlayerId = () => {
  return nanoid(10);
};

export const promptPlayerName = (current?: string) => {
  const name = prompt("Qual seu nome?", current);
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
    vote: undefined,
    createdAt: Date.now(),
  };
};

export const savePlayerData = (player: Player) => {
  localStorage.setItem(playerDataKey, JSON.stringify(player));
};

export const defaultState: State = {
  phase: Phase.Voting,
  playerId: "",
  players: {},
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
  switch (action.type) {
    case "sync":
      if (!action.payload) {
        return state;
      }
      return update(state, {
        phase: { $set: action.payload.phase },
        players: { $merge: action.payload.players },
      });
    case "game/reveal":
      return update(state, { phase: { $set: Phase.Reveal } });
    case "game/restart":
      return update(state, {
        phase: { $set: Phase.Voting },
        players: {
          $map: (player) => ({ ...player, vote: undefined }),
        },
      });
    case "player/add":
      return update(state, {
        playerId: (playerId) => playerId || action.payload.id,
        players: { $merge: { [action.payload.id]: action.payload } },
      });
    case "player/remove":
      return update(state, {
        players: { $unset: [action.payload.id] },
      });
    case "player/rename":
      return update(state, {
        players: {
          [action.payload.id]: { name: { $set: action.payload.name } },
        },
      });
    case "player/vote":
      return update(state, {
        players: {
          [action.payload.id]: {
            vote: {
              $set:
                action.payload.vote === state.players[action.payload.id].vote
                  ? undefined
                  : action.payload.vote,
            },
          },
        },
      });
    default:
      return state;
  }
};

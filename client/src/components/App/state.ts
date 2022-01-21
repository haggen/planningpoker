import { createContext, Dispatch, useContext } from "react";
import update from "immutability-helper";

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
  playerId: string | undefined;
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
      type: "sync";
      payload?: State;
    };

export const defaultState = {
  phase: Phase.Voting,
  players: [],
};

export const Context = createContext<Value>({
  isConnected: false,
  gameId: undefined,
  playerId: undefined,
  dispatch: () => {},
  ...defaultState,
});

export const useGameState = () => {
  return useContext(Context);
};

export const reducer = (state: State, action: Action) => {
  let playerIndex;

  switch (action.type) {
    case "game/reveal":
      return update(state, { phase: { $set: Phase.Reveal } });
    case "sync":
      if (!action.payload) {
        return state;
      }
      return update(state, {
        phase: { $set: action.payload.phase },
        players: { $push: action.payload.players },
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

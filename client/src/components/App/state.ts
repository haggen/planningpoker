import { createContext, Dispatch, useContext, useReducer } from "react";
import update from "immutability-helper";

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

type Value = State & {
  id: string | undefined;
  currentPlayer: Player | undefined;
  dispatch: Dispatch<Action>;
};

export type Action =
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

export const Context = createContext<Value>({
  id: undefined,
  currentPlayer: undefined,
  dispatch: () => {},
  ...defaultState,
});

export const useGameState = () => {
  return useContext(Context);
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

export const useGameStateReducer = () => {
  return useReducer(reducer, defaultState);
};

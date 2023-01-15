import { useCallback } from "react";
import { ulid } from "ulid";

import {
  useAwarenessState,
  useClientId,
  useSharedMap,
  useSharedUpdate,
} from "~/src/lib/yjs";

/**
 * Create unique URL-safe ID.
 */
export function createId() {
  return ulid().toLocaleLowerCase();
}

/**
 * Shared state keys.
 */
export enum SharedState {
  Stage = "stage",
  Hands = "hands",
}

/**
 * Hand of a player.
 */
export type THand = number | "?" | "w" | undefined;

/**
 * Game stage type.
 */
export type TStage = "voting" | "reveal";

/**
 * Hands type.
 */
export type THands = Record<string, THand>;

/**
 * Use game state.
 */
export function useGame() {
  const { stage = "voting" } = useSharedMap<{ stage: TStage }>(
    SharedState.Stage
  );
  const hands = useSharedMap<THands>(SharedState.Hands);
  const clientId = useClientId();

  const setStage = useSharedUpdate(({ doc }, stage: TStage) => {
    doc.getMap(SharedState.Stage).set("stage", stage);

    if (stage === "voting") {
      doc.getMap<THand>(SharedState.Hands).forEach((hand, key) => {
        if (hand !== "w") {
          doc.getMap(SharedState.Hands).delete(key);
        }
      });
    }
  });

  const setHand = useSharedUpdate(({ doc }, hand: THand) => {
    if (hand === undefined) {
      doc.getMap(SharedState.Hands).delete(clientId);
    } else {
      doc.getMap(SharedState.Hands).set(clientId, hand);
    }
  });

  return { stage, hands, setStage, setHand } as const;
}

/**
 * Client profile type.
 */
export type TProfile = {
  name: string;
};

/**
 * Players state and local awaress mutator.
 */
export function usePlayers() {
  const clientId = useClientId();
  const { count, state, setLocalState } = useAwarenessState<TProfile>();

  const setName = useCallback(
    (name: string) => {
      setLocalState((state) => ({ ...state, name }));
    },
    [setLocalState]
  );

  return {
    clientId,
    count,
    players: Object.fromEntries(
      Object.keys(state).map((key) => [key, state[key] ?? {}])
    ),
    setName,
  } as const;
}

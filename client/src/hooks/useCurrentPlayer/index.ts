import { nanoid } from "nanoid";
import { useCallback } from "react";

import { Player } from "src/components/App/state";
import { useStoredState } from "src/hooks/useStoredState";

/**
 * Current user data.
 */
export const useCurrentPlayer = () => {
  const [player, setPlayer] = useStoredState<Player | undefined>(
    "player",
    undefined
  );

  const create = useCallback(
    ({ name }: { name: string }) => {
      setPlayer({
        id: nanoid(10),
        name,
        vote: "",
        createdAt: Date.now(),
      });
    },
    [setPlayer]
  );

  return [player, create] as const;
};

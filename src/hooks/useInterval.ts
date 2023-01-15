import { useEffect } from "react";

import { useLiveRef } from "~/src/hooks/useLiveRef";

/**
 * Execute callback periodically.
 */
export function useInterval(
  callback: (clear: () => void) => void,
  delay: number
) {
  const callbackRef = useLiveRef(callback);

  useEffect(() => {
    if (delay === 0) {
      return;
    }
    const id = setInterval(() => callbackRef.current(clear), delay);
    const clear = () => clearInterval(id);
    return () => clear();
  }, [callbackRef, delay]);
}

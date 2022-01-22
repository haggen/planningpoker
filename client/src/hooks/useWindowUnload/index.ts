import { useEffect, useRef } from "react";

/**
 * Invoke handler on window beforeunload event.
 */
export const useWindowUnload = (callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const handler = () => {
      callbackRef.current?.();
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  callbackRef.current = callback;
};

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
    window.addEventListener("unload", handler);
    return () => {
      window.removeEventListener("unload", handler);
    };
  }, []);

  callbackRef.current = callback;
};

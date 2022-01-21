import { useEffect, useState } from "react";

type Initializer<T> = T extends Function ? never : T | (() => T);

/**
 * Use persistent state via local storage.
 */
export const useStoredState = <T>(
  key: string,
  defaultValue: Initializer<T>
) => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    if (typeof defaultValue === "function") {
      return defaultValue();
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};

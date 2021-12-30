import { useEffect, useState } from "react";

export const useStoredState = <T>(key: string, getDefaultValue: () => T) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return getDefaultValue();
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};

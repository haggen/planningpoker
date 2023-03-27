import {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";

import { useLiveRef } from "~/src/hooks/useLiveRef";

/**
 * Context value type.
 */
export type ContextValue = {
  doc: Y.Doc;
  provider: WebrtcProvider;
};

/**
 * Yjs document.
 */
const doc = new Y.Doc();

/**
 * Provides access to the document and synchronization provider.
 */
export const Context = createContext<ContextValue | null>(null);

/**
 * Yjs provider props.
 */
type Props = {
  roomId: string;
  children: ReactNode;
};

/**
 * Provider for document and synchronization provider.
 */
export function Provider({ roomId, children }: Props) {
  const [provider, setProvider] = useState<WebrtcProvider>();

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const provider = new WebrtcProvider(roomId, doc, {
      signaling: ["wss://signaling.crz.li"],
    });
    setProvider(provider);

    return () => {
      provider.destroy();
    };
  }, [roomId]);

  if (!provider) {
    return null;
  }

  return (
    <Context.Provider
      value={{
        doc,
        provider,
      }}
    >
      {children}
    </Context.Provider>
  );
}

/**
 * Get Yjs context value.
 */
function useYjs() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context has no value. Did you forget the provider?");
  }
  return context;
}

/**
 * Get local client ID from awareness.
 */
export function useClientId() {
  const { provider } = useYjs();
  return String(provider.awareness.clientID);
}

/**
 * Get snapshot of given awareness state.
 */
function getAwarenessStateSnapshot<T extends object>(awareness: Awareness) {
  const state = Object.fromEntries(
    (awareness.getStates() as Map<number, T>).entries()
  );
  return state;
}

/**
 * Get and subscribe to awareness state mutations.
 */
export function useAwarenessState<T extends object>() {
  const {
    provider: { awareness },
  } = useYjs();

  const [state, setState] = useState(getAwarenessStateSnapshot<T>(awareness));

  useEffect(() => {
    const onChange = () => {
      setState(getAwarenessStateSnapshot<T>(awareness));
    };
    awareness.on("change", onChange);

    return () => {
      awareness.off("change", onChange);
    };
  }, [awareness]);

  const setLocalState = useCallback(
    (mixed: SetStateAction<T>) => {
      if (typeof mixed === "function") {
        awareness.setLocalState(mixed(awareness.getLocalState() as T));
      } else {
        awareness.setLocalState(mixed);
      }
    },
    [awareness]
  );

  return {
    state,
    count: Object.keys(state).length,
    setLocalState,
  } as const;
}

/**
 * Get snapshot from a shared map.
 */
function getSharedMapSnapshot<T extends object>(map: Y.Map<T[keyof T]>) {
  return map.toJSON() as T;
}

/**
 * Get snapshop of a shared map and subscribe to changes.
 */
export function useSharedMap<T extends object>(name: string) {
  const { doc } = useYjs();
  const map = doc.getMap<T[keyof T]>(name);
  const [snapshot, setSnapshot] = useState(getSharedMapSnapshot<T>(map));

  useEffect(() => {
    const onChange = () => {
      setSnapshot(getSharedMapSnapshot<T>(map));
    };
    map.observe(onChange);

    return () => {
      map.unobserve(onChange);
    };
  }, [map]);

  return snapshot;
}

/**
 * Get shared value and subscribe to changes.
 */
export function useSharedValue<T>(name: string, defaultValue?: T) {
  const { value = defaultValue } = useSharedMap<{ value: T }>(name);
  return value;
}

/**
 * Mutate shared state.
 */
export function useSharedUpdate<P extends unknown[]>(
  update: (transaction: Y.Transaction, ...args: P) => void
) {
  const { doc } = useYjs();
  const updateRef = useLiveRef(update);

  return useCallback(
    (...args: P) => {
      doc.transact((transaction) => updateRef.current(transaction, ...args));
    },
    [doc, updateRef]
  );
}

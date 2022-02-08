import { useCallback } from "react";
import { useWebSocket } from "src/hooks/useWebSocket";

type Config<T> = {
  channel: string | undefined;
  onIncoming: (action: T) => void;
  onOutgoing: (action: T) => void;
};

/**
 * Specializes useWebSocket to handle incoming and outgoing actions.
 */
export const useMultiplayer = <T>({
  channel,
  onIncoming,
  onOutgoing,
}: Config<T>) => {
  const [readyState, dispatch] = useWebSocket(
    channel ? `${process.env.REACT_APP_API_URL}/${channel}` : "",
    {
      onMessage(event) {
        try {
          onIncoming(JSON.parse(event.data));
        } catch (e) {
          console.error("Error decoding incoming action", e);
        }
      },
    }
  );

  const broadcast = useCallback(
    (action: T) => {
      try {
        onOutgoing(action);
        dispatch(JSON.stringify(action));
      } catch (e) {
        console.error("Error encoding outgoing action", e);
      }
    },
    [dispatch, onOutgoing]
  );

  return [readyState === WebSocket.OPEN, broadcast] as const;
};

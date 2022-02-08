import { useCallback, useEffect, useRef, useState } from "react";

type Listeners = {
  onOpen?: (event: WebSocketEventMap["open"]) => void;
  onMessage?: (event: WebSocketEventMap["message"]) => void;
  onError?: (event: WebSocketEventMap["error"]) => void;
  onClose?: (event: WebSocketEventMap["close"]) => void;
};

/**
 * Use a WebSocket connection.
 */
export const useWebSocket = (url: string, listeners: Listeners = {}) => {
  const webSocketRef = useRef<WebSocket>();
  const listenersRef = useRef(listeners);
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING);

  useEffect(() => {
    webSocketRef.current?.close();

    if (!url) {
      return;
    }

    webSocketRef.current = new WebSocket(url);

    webSocketRef.current.onopen = function (event) {
      setReadyState(this.readyState);
      listenersRef.current.onOpen?.(event);
    };
    webSocketRef.current.onmessage = function (event) {
      listenersRef.current.onMessage?.(event);
    };
    webSocketRef.current.onclose = function (event) {
      setReadyState(this.readyState);
      listenersRef.current.onClose?.(event);
    };
    webSocketRef.current.onerror = function (event) {
      setReadyState(this.readyState);
      listenersRef.current.onError?.(event);
    };

    return () => {
      webSocketRef.current?.close();
    };
  }, [url]);

  const dispatch = useCallback((data: string) => {
    webSocketRef.current?.send(data);
  }, []);

  listenersRef.current = listeners;

  return [readyState, dispatch] as const;
};

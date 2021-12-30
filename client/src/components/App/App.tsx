import { useCallback, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";
import useWebSocket from "react-use-websocket";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";
import { useStoredState } from "src/hooks/useStoredState";

import { Action, Context, useGameStateReducer } from "./state";

const createGameId = () => {
  return nanoid(10);
};

const createPlayerId = () => {
  return nanoid(10);
};

export const promptPlayerName = () => {
  const name = prompt("Qual seu nome?");
  if (name) {
    return name;
  }
  return "Anônimo";
};

const useGameId = () => {
  const [match, params] = useRoute("/:gameId");
  const [, setLocation] = useLocation();

  const { gameId } = params ?? {};

  useEffect(() => {
    if (!match) {
      setLocation("/" + createGameId(), { replace: true });
    }
  }, [match, setLocation]);

  return gameId;
};

export const App = () => {
  const gameId = useGameId();
  const [playerId] = useStoredState("playerId", createPlayerId);
  const [state, reducerDispatch] = useGameStateReducer();

  console.log({ gameId });

  const { sendJsonMessage: webSocketDispatch, readyState } = useWebSocket(
    gameId ? `${process.env.REACT_APP_API_URL}/${gameId}` : "",
    {
      onMessage(event) {
        const action = JSON.parse(event.data);
        if (action.type === "sync" && !action.payload) {
          webSocketDispatch({ type: "sync", payload: state });
        }
        reducerDispatch(action);
      },
    }
  );

  const { players } = state;
  const currentPlayer = players.find((player) => player.id === playerId);

  const dispatch = useCallback(
    (action: Action) => {
      reducerDispatch(action);
      webSocketDispatch(action);
    },
    [webSocketDispatch]
  );

  useEffect(() => {
    if (!playerId) {
      return;
    }

    if (readyState !== WebSocket.OPEN) {
      return;
    }

    if (!currentPlayer) {
      dispatch({
        type: "addPlayer",
        payload: {
          id: playerId,
          name: promptPlayerName(),
          vote: "",
        },
      });
    }
  }, [readyState, playerId, currentPlayer, dispatch]);

  return (
    <Context.Provider value={{ id: gameId, currentPlayer, dispatch, ...state }}>
      <Layout>
        <Header />
        <Content />
        <Deck />
      </Layout>
    </Context.Provider>
  );
};

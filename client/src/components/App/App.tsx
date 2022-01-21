import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";
import { useCurrentPlayer } from "src/hooks/useCurrentPlayer";
import { useWindowUnload } from "src/hooks/useWindowUnload";
import { useMultiplayer } from "src/hooks/useMultiplayer";

import { Action, Context, defaultState, reducer } from "./state";

const createGameId = () => {
  return nanoid(10);
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

export const promptPlayerName = () => {
  const name = prompt("Qual seu nome?");
  if (name) {
    return name;
  }
  return "Anônimo";
};

export const App = () => {
  const gameId = useGameId();
  const [player, setPlayer] = useCurrentPlayer();
  const [state, dispatch] = useReducer(reducer, defaultState);

  const [isConnected, broadcast] = useMultiplayer<Action>({
    channel: player ? gameId : undefined,
    onIncoming(action) {
      if (action.type === "sync" && !action.payload) {
        broadcast({ type: "sync", payload: state });
      } else {
        dispatch(action);
      }
    },
  });

  const dispatchAndBroadcast = useCallback(
    (action: Action) => {
      dispatch(action);
      broadcast(action);
    },
    [broadcast]
  );

  useEffect(() => {
    if (!player) {
      return;
    }

    if (!isConnected) {
      return;
    }

    if (state.players.length > 0) {
      return;
    }

    dispatchAndBroadcast({
      type: "player/add",
      payload: player,
    });
  }, [player, state, dispatchAndBroadcast, isConnected]);

  useWindowUnload(() => {
    if (!player) {
      return;
    }

    if (!isConnected) {
      return;
    }

    dispatchAndBroadcast({ type: "player/remove", payload: { id: player.id } });
  });

  useEffect(() => {
    if (player) {
      return;
    }
    setPlayer({ name: promptPlayerName() });
  }, [player, setPlayer]);

  const contextValue = useMemo(
    () => ({
      ...state,
      isConnected,
      playerId: player?.id,
      gameId,
      dispatch: dispatchAndBroadcast,
    }),
    [state, isConnected, player, gameId, dispatchAndBroadcast]
  );

  return (
    <Context.Provider value={contextValue}>
      <Layout>
        <Header />
        <Content />
        <Deck />
      </Layout>
    </Context.Provider>
  );
};

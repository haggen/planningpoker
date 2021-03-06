import { useEffect, useMemo, useReducer } from "react";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Footer } from "src/components/Footer";
import { useWindowUnload } from "src/hooks/useWindowUnload";
import { useMultiplayer } from "src/hooks/useMultiplayer";

import {
  Action,
  Context,
  defaultState,
  getSavedPlayerData,
  reducer,
  savePlayerData,
  useGameId,
  Phase,
  timeToReveal,
} from "./state";

export const App = () => {
  const gameId = useGameId();
  const [state, dispatch] = useReducer(reducer, defaultState);

  const { playerId, players, phase } = state;

  const [isConnected, broadcast] = useMultiplayer<Action>({
    channel: gameId,
    onIncoming(action) {
      if (action.type === "stateUpdateRequest") {
        broadcast({ type: "stateUpdateReply", payload: state });
      } else {
        dispatch(action);
      }
    },
    onOutgoing(action) {
      dispatch(action);
    },
  });

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    if (Object.keys(players).length > 0) {
      return;
    }

    const player = getSavedPlayerData();

    broadcast({
      type: "player/add",
      payload: player,
    });
  }, [broadcast, isConnected, players]);

  useEffect(() => {
    if (Object.keys(players).length === 0) {
      return;
    }
    if (!playerId || !players[playerId]) {
      return;
    }
    savePlayerData(players[playerId]);
  }, [playerId, players]);

  useEffect(() => {
    if (phase !== Phase.Countdown) {
      return;
    }
    const id = setTimeout(() => {
      dispatch({ type: "game/reveal" });
    }, timeToReveal);
    return () => {
      clearTimeout(id);
    };
  }, [dispatch, phase]);

  useWindowUnload(() => {
    if (!isConnected) {
      return;
    }
    broadcast({ type: "player/remove", payload: { id: playerId } });
  });

  const contextValue = useMemo(
    () => ({
      ...state,
      isConnected,
      gameId,
      dispatch: broadcast,
    }),
    [broadcast, gameId, isConnected, state]
  );

  return (
    <Context.Provider value={contextValue}>
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Context.Provider>
  );
};

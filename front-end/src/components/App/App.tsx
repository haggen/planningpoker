import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { nanoid } from "nanoid";

import { Layout } from "src/components/Layout";
import { Header } from "src/components/Header";
import { Content } from "src/components/Content";
import { Deck } from "src/components/Deck";

export enum GamePhase {
  Voting,
  Reveal,
}

type GameContext = {
  id: string | undefined;
  phase: GamePhase;
};

const defaultState = {
  id: undefined,
  phase: GamePhase.Voting,
};

const Context = createContext<GameContext>(defaultState);

export const useGameState = () => {
  return useContext(Context);
};

const createGameId = () => {
  return nanoid(10);
};

export const App = () => {
  const [phase] = useState(defaultState.phase);
  const [match, params] = useRoute("/:gameId");
  const [, setLocation] = useLocation();

  const { gameId } = params ?? {};

  useEffect(() => {
    if (!match) {
      setLocation("/" + createGameId(), { replace: true });
    }
  }, [match, setLocation]);

  console.log({ gameId });

  return (
    <Context.Provider value={{ id: gameId, phase }}>
      <Layout>
        <Header />
        <Content />
        <Deck />
      </Layout>
    </Context.Provider>
  );
};

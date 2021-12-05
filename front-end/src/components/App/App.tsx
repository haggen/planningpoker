import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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

type GameState = {
  id: string | undefined;
  phase: GamePhase;
  setPhase: Dispatch<SetStateAction<GamePhase>>;
};

const defaultState = {
  id: undefined,
  phase: GamePhase.Voting,
  setPhase: () => {},
};

const GameContext = createContext<GameState>(defaultState);

export const useGameState = () => {
  return useContext(GameContext);
};

const createGameId = () => {
  return nanoid(10);
};

export const App = () => {
  const [phase, setPhase] = useState(defaultState.phase);
  const [match, params] = useRoute("/:gameId");
  const [, setLocation] = useLocation();

  const { gameId } = params ?? {};

  useEffect(() => {
    if (!match) {
      setLocation("/" + createGameId(), { replace: true });
    }
  }, [match, setLocation]);

  return (
    <GameContext.Provider value={{ id: gameId, phase, setPhase }}>
      <Layout>
        <Header />
        <Content />
        <Deck />
      </Layout>
    </GameContext.Provider>
  );
};

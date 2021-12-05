import { Button } from "src/components/Button";
import { GamePhase, useGameState } from "src/components/App";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { phase, playerName, dispatch } = useGameState();

  const handleReveal = () => {
    dispatch({ type: "changePhase", payload: GamePhase.Reveal });
  };

  const handleRestart = () => {
    dispatch({ type: "changePhase", payload: GamePhase.Voting });
  };

  return (
    <ul className={styles.menu}>
      <li>
        {phase === GamePhase.Voting ? (
          <Button onClick={handleReveal}>Revelar</Button>
        ) : (
          <Button onClick={handleRestart}>Recomeçar</Button>
        )}
      </li>
      <li>
        <Button type="ghost">{playerName}</Button>
      </li>
    </ul>
  );
};

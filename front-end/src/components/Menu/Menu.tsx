import { Button } from "src/components/Button";
import { GamePhase, useGameState } from "src/components/App";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { phase, setPhase } = useGameState();

  const handleReveal = () => {
    setPhase(GamePhase.Reveal);
  };

  const handleRestart = () => {
    setPhase(GamePhase.Voting);
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
        <Button type="ghost">Fulano</Button>
      </li>
    </ul>
  );
};

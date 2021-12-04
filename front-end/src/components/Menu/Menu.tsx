import { Button } from "src/components/Button";
import { GamePhase, useGameState } from "src/components/App";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { id, phase } = useGameState();

  return (
    <ul className={styles.menu}>
      <li>
        {phase === GamePhase.Voting ? (
          <Button>Revelar</Button>
        ) : (
          <Button>Recomeçar</Button>
        )}
      </li>
      <li>Fulano de Tal</li>
    </ul>
  );
};

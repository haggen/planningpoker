import { Button } from "src/components/Button";
import { GamePhase, useGameState } from "src/components/App";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { phase } = useGameState();

  return (
    <ul className={styles.menu}>
      <li>
        {phase === GamePhase.Voting ? (
          <Button>Revelar</Button>
        ) : (
          <Button>Recomeçar</Button>
        )}
      </li>
      <li>
        <Button type="ghost">Fulano</Button>
      </li>
    </ul>
  );
};

import { Player } from "src/components/Player";
import { useGameState } from "src/components/App";

import styles from "./Table.module.css";

export const Table = () => {
  const { players } = useGameState();

  return (
    <ul className={styles.table}>
      {Object.values(players).map(({ id, name, vote }) => (
        <li key={id}>
          <Player name={name} vote={vote} />
        </li>
      ))}
    </ul>
  );
};

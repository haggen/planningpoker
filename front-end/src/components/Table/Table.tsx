import { Player } from "src/components/Player";

import styles from "./Table.module.css";

// type TableProps = {};

export const Table = () => {
  return (
    <ul className={styles.table}>
      <li>
        <Player name="Fulano" vote="3" />
      </li>
      <li>
        <Player name="Fulano" />
      </li>
      <li>
        <Player name="Fulano" vote="8" />
      </li>
      <li>
        <Player name="Fulano" />
      </li>
      <li>
        <Player name="Fulano" />
      </li>
      <li>
        <Player name="Fulano" vote="13" />
      </li>
      <li>
        <Player name="Fulano" vote="5" />
      </li>
      <li>
        <Player name="Fulano" vote="8" />
      </li>
      <li>
        <Player name="Fulano" />
      </li>
      <li>
        <Player name="Fulano" />
      </li>
      <li>
        <Player name="Fulano" />
      </li>
    </ul>
  );
};

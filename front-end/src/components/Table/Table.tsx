import { Player } from "src/components/Player";

import styles from "./Table.module.css";

type TableProps = {};

export const Table = ({}: TableProps) => {
  return (
    <ul className={styles.table}>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
      <li>
        <Player name="Fulano" vote="20" />
      </li>
    </ul>
  );
};

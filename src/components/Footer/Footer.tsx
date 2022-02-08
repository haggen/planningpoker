import { Phase, useGameState } from "src/components/App";
import { Average } from "src/components/Average";
import { Deck } from "src/components/Deck";

import styles from "./Footer.module.css";

export const Footer = () => {
  const { phase } = useGameState();

  return (
    <footer className={styles.footer}>
      {phase === Phase.Reveal ? <Average /> : <Deck />}
    </footer>
  );
};

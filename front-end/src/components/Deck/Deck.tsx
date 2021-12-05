import { Card } from "src/components/Card";

import styles from "./Deck.module.css";

// type DeckProps = {};

export const Deck = () => {
  return (
    <ul className={styles.deck}>
      <li>
        <Card value="0" />
      </li>
      <li>
        <Card value="0.5" />
      </li>
      <li>
        <Card value="1" />
      </li>
      <li>
        <Card value="2" />
      </li>
      <li>
        <Card value="3" />
      </li>
      <li>
        <Card value="5" />
      </li>
      <li>
        <Card value="8" />
      </li>
      <li>
        <Card value="13" />
      </li>
      <li>
        <Card value="20" />
      </li>
      <li>
        <Card value="40" />
      </li>
      <li>
        <Card value="100" />
      </li>
      <li>
        <Card value="?" />
      </li>
    </ul>
  );
};

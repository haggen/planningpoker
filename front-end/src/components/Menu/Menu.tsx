import { Button } from "src/components/Button";

import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li>
        <Button>Revelar</Button>
      </li>
      <li>Fulano de Tal</li>
    </ul>
  );
};

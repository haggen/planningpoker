import { ReactNode } from "react";

import { Brand } from "src/components/Brand";
import { Menu } from "src/components/Menu";

import styles from "./Header.module.css";

type HeaderProps = {};

export const Header = () => {
  return (
    <header className={styles.header}>
      <Brand />
      <Menu />
    </header>
  );
};

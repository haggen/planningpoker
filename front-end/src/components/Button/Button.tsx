import { ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return <button className={styles.button}>{children}</button>;
};

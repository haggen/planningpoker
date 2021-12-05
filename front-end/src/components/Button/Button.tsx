import { ReactNode } from "react";
import c from "classnames";

import styles from "./Button.module.css";

type ButtonProps = {
  type?: "default" | "ghost";
  children: ReactNode;
};

export const Button = ({ type = "default", children }: ButtonProps) => {
  const className = c(styles.button, styles[type]);
  return <button className={className}>{children}</button>;
};

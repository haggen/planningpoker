import { MouseEventHandler, ReactNode } from "react";
import c from "classnames";

import styles from "./Button.module.css";

type ButtonProps = {
  type?: "default" | "ghost";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export const Button = ({
  type = "default",
  onClick,
  children,
}: ButtonProps) => {
  const className = c(styles.button, styles[type]);
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

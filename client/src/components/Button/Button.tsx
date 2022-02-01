import { MouseEventHandler, ReactNode } from "react";
import c from "classnames";

import styles from "./Button.module.css";

type ButtonProps = {
  appearance?: "default" | "ghost";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export const Button = ({
  appearance = "default",
  onClick,
  children,
}: ButtonProps) => {
  const className = c(styles.button, styles[appearance]);

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

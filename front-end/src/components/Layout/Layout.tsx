import { ReactNode } from "react";

import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.layout}>{children}</div>;
};

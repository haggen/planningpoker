import { Table } from "src/components/Table";

import styles from "./Content.module.css";

// type ContentProps = {};

export const Content = () => {
  return (
    <main className={styles.content}>
      <Table />
    </main>
  );
};

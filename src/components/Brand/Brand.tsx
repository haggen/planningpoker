import styles from "./Brand.module.css";
import { ReactComponent as Vector } from "./Brand.svg";

export const Brand = () => {
  return (
    <a href="/" className={styles.brand}>
      <Vector />
    </a>
  );
};

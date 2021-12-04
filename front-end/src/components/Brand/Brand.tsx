import { ReactComponent as BrandVector } from "src/images/brand.svg";

import styles from "./Brand.module.css";

export const Brand = () => {
  return (
    <a href="/" className={styles.brand}>
      <BrandVector />
    </a>
  );
};

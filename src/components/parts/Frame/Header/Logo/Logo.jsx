import React from "react";

import styles from "../Header.module.less";

export default function Logo(props) {
  return (
    <div className={styles["logo-wrapper"]}>
      <div className={styles["logo-name"]}>Scan</div>
      <div className={styles["logo-suffix"]}>UP</div>
    </div>
  );
}
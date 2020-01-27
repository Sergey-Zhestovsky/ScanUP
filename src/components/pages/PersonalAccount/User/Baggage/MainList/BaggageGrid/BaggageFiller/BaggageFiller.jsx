import React from "react";

import styles from "../baggageGrid.module.less";

export default function GridElement(props) {
  return (
    <div className={styles["baggage-skeleton"]}>
      <div className="">
        <div className={styles["skeleton-accent"]}>nothing</div>
        <div className={styles["skeleton-ending"]}>currently.</div>
      </div>
    </div>
  );
}
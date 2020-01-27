import React from "react";

import styles from "./baggageNotFound.module.less";

export default function BaggageNotFound(props) {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>No baggage found on</div>
      <div className={styles["identificator"]}>{props.uId}</div>
    </div>
  );
}
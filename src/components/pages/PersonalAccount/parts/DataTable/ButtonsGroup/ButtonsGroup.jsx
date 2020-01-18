import React from "react";

import styles from "../DataTable.module.less";

export default function ButtonsGroup(props) {
  return (
    <div className={styles["buttons-group"]}>{props.children}</div>
  );
}
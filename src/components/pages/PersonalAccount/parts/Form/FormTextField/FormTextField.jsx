import React from "react";

import styles from "../Form.module.less";

export default function FormTextField(props) {
  return (
    <div className={styles["text-field"]}>
      <div className={styles["text-field-name"]}>{props.name}</div>
      <div className={styles["text-field-value"]}>{props.value}</div>
    </div>
  );
}
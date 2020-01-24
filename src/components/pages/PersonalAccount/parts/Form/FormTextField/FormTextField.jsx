import React from "react";

import formatOutput from "../../../../../../modules/formatOutput";

import styles from "../Form.module.less";

export default function FormTextField(props) {
  return (
    <div className={styles["text-field"]}>
      <div className={styles["text-field-name"]}>{props.name}</div>
      <div className={styles["text-field-value"]}>{formatOutput(props.value, props.format)}</div>
    </div>
  );
}
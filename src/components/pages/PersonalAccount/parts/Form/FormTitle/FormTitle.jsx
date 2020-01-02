import React from "react";

import styles from "../Form.module.less";

export default function FormTitle(props) {
  return (
    <div className={styles["form-title"]}>{props.children}</div>
  );
}
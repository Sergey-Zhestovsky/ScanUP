import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormScannerDescribe(props) {
  let isEmpty = !props.value,
    emptyClass = isEmpty ? styles["empty"] : null;

  return (
    <div className={concatClasses(styles["form-scanner-describe"], emptyClass)}>
      <div className={styles["text-field-name"]}>{props.name}</div>
      {
        props.value
          ? (
            <div className={styles["sub-group"]}>
              {
                props.value.map((el, i) =>
                  <div className={styles["scanner-describe-box"]} key={i}>{el}</div>
                )
              }
            </div>
          ) : (
            <div className={styles["text-field-value"]}></div>
          )
      }
    </div>
  );
}
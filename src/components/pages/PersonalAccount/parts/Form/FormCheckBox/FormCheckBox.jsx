import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";
import CheckBox from "../../../../../utils/CheckBox/CheckBox"

import styles from "../Form.module.less";

export default function FormCheckBox(props) {
  let {
    children,
    className,
    ...rest
  } = props;

  return (
    <div className={concatClasses(styles["form-input-field"], className)}>
      <div className={styles["form-line-wrapper"]}>
        <div className={styles["form-input-field-name"]}>{children}</div>
        <div className={styles["form-checkbox-wrapper"]}>
          <CheckBox {...rest} />
        </div>
      </div>
    </div>
  );
}
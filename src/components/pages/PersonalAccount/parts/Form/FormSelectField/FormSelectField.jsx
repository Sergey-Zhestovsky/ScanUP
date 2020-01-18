import React from "react";

import Select from "../../../../../utils/Select/Select";
import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormSelectField(props) {
  let {
    children,
    error,
    ...rest
  } = props;

  let errorClass = error ? styles["error"] : null;

  return (
    <div className={concatClasses(styles["form-select-block"], styles["form-line-wrapper"])}>
      <div className={styles["form-input-field-name"]}>{children}</div>
      <Select className={concatClasses(styles["form-select"], errorClass)} {...rest} />
    </div>
  );
}
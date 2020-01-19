import React from "react";

import Select from "../../../../../utils/Select/Select";
import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormSelectField(props) {
  let {
    children,
    error,
    disabled,
    ...rest
  } = props;

  let errorClass = error ? styles["error"] : null,
    disabledClass = disabled ? styles["disabled"] : null;

  return (
    <div className={concatClasses(styles["form-select-block"], styles["form-line-wrapper"], disabledClass)}>
      <div className={styles["form-input-field-name"]}>{children}</div>
      <Select
        className={concatClasses(styles["form-select"], errorClass)}
        disabled={disabled}
        {...rest} />
    </div>
  );
}
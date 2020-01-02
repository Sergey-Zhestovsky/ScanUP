import React from "react";

import Input from "../../../../../utils/Input/Input";
import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormInputField(props) {
  let {
    children,
    render,
    className,
    inputClassName,
    warning,
    error,
    ...rest
  } = props;

  let body = render
    ? render()
    : <Input className={concatClasses(styles["form-input"], inputClassName)} {...rest} />

  return (
    <div className={concatClasses(styles["form-input-field"], props.className)}>
      <div className={concatClasses(styles["form-line-wrapper"])}>
        <div className={styles["form-input-field-name"]}>{children}</div>
        {body}
      </div>
      {
        warning &&
        <div className={`${styles["form-line-message"]} ${styles["warning"]}`}>{warning}</div>
      }
      {
        error &&
        <div className={`${styles["form-line-message"]} ${styles["error"]}`}>{error}</div>
      }
    </div>
  );
}
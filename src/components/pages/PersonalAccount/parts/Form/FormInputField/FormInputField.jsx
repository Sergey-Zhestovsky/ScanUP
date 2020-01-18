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

    error,
    errorMessage,
    warning,

    disabled,
    ...rest
  } = props;

  let errorClass = warning && styles["warning"] || (error && styles["error"]),
    disabledClass = disabled ? styles["disabled"] : null;

  let body = render
    ? render()
    : <Input disabled={disabled} className={concatClasses(styles["form-input"], errorClass, inputClassName)} {...rest} />

  return (
    <div className={concatClasses(styles["form-input-field"], disabledClass, className)}>
      <div className={concatClasses(styles["form-line-wrapper"])}>
        <div className={styles["form-input-field-name"]}>{children}</div>
        {body}
      </div>
      {
        errorMessage &&
        <div className={`${styles["form-line-message"]} ${errorClass}`}>{errorMessage}</div>
      }
    </div>
  );
}
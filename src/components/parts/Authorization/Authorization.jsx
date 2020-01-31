import React from "react";

import Button from "../../utils/Button/Button";
import Input from "../../utils/Input/Input";
import concatClasses from "../../../modules/concatClasses";

import styles from "./Authorization.module.less";

export default function Authorization(props) {
  function defaultSubmit(event) {
    return event.preventDefault();
  }

  let {
    onSubmit = defaultSubmit,
    withWrapper,
    children,
    ...rest
  } = props;

  let body = (
    <div className={styles["auth-form-main-col"]}>
      <div className={styles["auth-form-block"]}>
        <form onSubmit={onSubmit} className={styles["auth-form"]} {...rest}>
          {children}
        </form>
        <div className={styles["auth-form-right-col"]}></div>
      </div>
    </div>
  );

  if (withWrapper) {
    body = (
      <div className={styles["auth-form-wrapper"]}>
        {body}
      </div>
    );
  }

  return body;
}

export function AuthTitle(props) {
  return (
    <div className={styles["auth-title-wrapper"]}>
      <div className={styles["auth-title"]}>
        {props.children}
      </div>
    </div>
  );
}

export function AuthField(props) {
  let {
    children,
    error,
    ...rest
  } = props;

  let inputClass = concatClasses(styles["auth-input"],
    error ? styles["error"] : null);

  return (
    <div className={styles["auth-input-field"]}>
      <div className={styles["auth-line-wrapper"]}>
        <div className={styles["auth-input-field-name"]}>{children}</div>
        <Input className={inputClass} {...rest} />
      </div>
      <div className={styles["auth-error-message"]}>{error}</div>
    </div>
  );
}

export function AuthSubmit(props) {
  return (
    <div className={styles["auth-submit-wrapper"]}>
      <Button className={styles["auth-submit"]} {...props} />
    </div>
  );
}
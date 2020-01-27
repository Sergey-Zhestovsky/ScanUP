import React from "react";

import FormInputField from "../FormInputField/FormInputField";
import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormTextarea(props) {
  let {
    maxLength,
    className,
    wrapperClassName,
    inputClassName,
    ...rest
  } = props;

  let valueLength = props.value && typeof props.value === typeof ""
    ? props.value.length
    : 0;

  return (
    <div className={styles["textarea-block"]}>
      <FormInputField
        {...rest}
        className={concatClasses(styles["textarea-inner-block"], className)}
        wrapperClassName={concatClasses(styles["textarea-block-wrapper"], wrapperClassName)}
        inputClassName={concatClasses(styles["textarea"], inputClassName)}
        textarea
      />
      {
        maxLength &&
        <div className={styles["textarea-counter"]}>
          {`${valueLength}/${maxLength}`}
        </div>
      }
    </div>
  );
}
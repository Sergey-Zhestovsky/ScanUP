import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export const formGroupStyles = {
  SINGLE: styles["form-group-single"]
};

export default function FormGroup(props) {
  let {
    withNestedGroup,
    className,
    children
  } = props;

  let nestedClass = withNestedGroup ? styles["nested-groups"] : null;

  return (
    <div className={concatClasses(styles["form-group"], nestedClass, className)}>
      {children}
    </div>
  );
}
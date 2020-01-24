import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormBlock(props) {
  return (
    <div className={concatClasses(styles["form-block"], props.style)} ref={props.forwardedRef}>
      {props.children}
    </div>
  );
}
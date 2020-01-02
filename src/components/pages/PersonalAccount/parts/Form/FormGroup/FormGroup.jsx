import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export const formGroupStyles = {
  SINGLE: styles["form-group-single"]
};


export default function FormGroup(props) {
  return (
    <div className={concatClasses(styles["form-group"], props.style)}>
      {props.children}
    </div>
  );
}
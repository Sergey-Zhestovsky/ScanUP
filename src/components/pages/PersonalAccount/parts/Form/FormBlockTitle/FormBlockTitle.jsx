import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export default function FormBlockTitle(props) {
  return (
    <div className={concatClasses(styles["form-block-title"], props.style)}>
      {props.children}
    </div>
  );
}
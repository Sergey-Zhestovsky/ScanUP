import React from "react";

import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../Form.module.less";

export const formBlockStyles = {
  COLUMN: styles["form-block-col"]
};

export default function FormBlock(props) {
  return (
    <div className={concatClasses(styles["form-block"], props.style)}>
      {props.children}
    </div>
  );
}
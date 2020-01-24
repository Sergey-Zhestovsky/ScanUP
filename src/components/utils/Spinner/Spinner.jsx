import React from "react";

import concatClasses from "../../../modules/concatClasses";

import styles from "./spinner.module.less";

export default function Spinner(props) {
  let style = {
    background: props.background
  };

  return (
    <div className={styles["spinner"]}>
      <div className={concatClasses(styles["spinner-body"], props.backgroundClass)} style={style}></div>
    </div>
  );
}
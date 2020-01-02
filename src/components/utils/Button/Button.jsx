import React from "react";

import concatClasses from "../../../modules/concatClasses";

import styles from "./Button.module.less";

export default function Button(props) {
  return (
    <button
      className={concatClasses(styles["button"], props.className)}
      onClick={props.onClick}>{props.children}</button>
  );
}
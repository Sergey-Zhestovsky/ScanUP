import React from "react";

import concatClasses from "../../../modules/concatClasses";

import styles from "./Button.module.less";

export const BUTTON_STYLE = {
  WARNING: styles["warning"]
}

export default function Button(props) {
  let {
    className,
    children,
    onClick,
    style,
  } = props;

  return (
    <button
      className={concatClasses(styles["button"], style, className)}
      onClick={onClick}>{children}</button>
  );
}
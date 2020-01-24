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
    disabled
  } = props;

  let disabledClass = disabled ? styles["disabled"] : null;

  return (
    <button
      className={concatClasses(styles["button"], style, disabledClass, className)}
      onClick={onClick}
      disabled={disabled}>{children}</button>
  );
}
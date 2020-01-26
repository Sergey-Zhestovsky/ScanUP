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
    disabled,
    disabledClassName = styles["disabled"]
  } = props;

  let disabledClass = disabled ? disabledClassName : null;

  return (
    <button
      className={concatClasses(styles["button"], style, disabledClass, className)}
      onClick={onClick}
      disabled={disabled}>{children}</button>
  );
}
import React from "react";

import Button from "../../../../utils/Button/Button";
import concatClasses from "../../../../../modules/concatClasses";

import styles from "./Toolbar.module.less"

export default function Toolbar(props) {
  return (
    <div className={styles["toolbar"]}>
      {props.children}
    </div>
  );
}


export function ToolbarGroup(props) {
  return (
    <div className={styles["toolbar-group"]}>
      {props.children}
    </div>
  );
}

export function ToolbarButton(props) {
  let {
    className,
    ...rest
  } = props;

  return (
    <Button
      className={concatClasses(styles["toolbar-button"], className)}
      {...rest}>{props.children}</Button>
  );
}
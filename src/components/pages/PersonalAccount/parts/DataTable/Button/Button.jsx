import React from "react";

import Button from "../../../../../utils/Button/Button";

import styles from "../DataTable.module.less";

export default function DataTableButton(props) {
  let {
    children,
    ...rest
  } = props;

  return (
    <Button className={styles["button"]} {...rest}>{children}</Button>
  );
}
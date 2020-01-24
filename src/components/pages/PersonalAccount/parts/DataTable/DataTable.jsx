import React from "react";

import Link from "./Link/Link";
import ButtonsGroup from "./ButtonsGroup/ButtonsGroup";
import Button from "./Button/Button";

import styles from "./DataTable.module.less";

export const TABLE_STYLES = {
  FIT: styles["fit"],
  CENTER: styles["center"]
}

export default function DataTable(props) {
  let {
    header,
    body = []
  } = props;

  return (
    <React.Fragment>
      <table className={styles["datatable"]}>
        <thead>
          {header}
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
      {
        !body.length &&
        <div className={styles["empty-body-message"]}>no data yet.</div>
      }
    </React.Fragment>
  );
}

export { ButtonsGroup, Button, Link };
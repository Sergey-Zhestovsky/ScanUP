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

{/* <tr>
  <td>1</td>
  <td>wer1-g4gd-bhwr</td>
  <td>delivering</td>
  <td>Zhest S.S.</td>
  <td>23.05.2019 12:50</td>
  <td><Link to={"/QWER-1234-HJKL"} /></td>
</tr> */}

export { ButtonsGroup, Button };
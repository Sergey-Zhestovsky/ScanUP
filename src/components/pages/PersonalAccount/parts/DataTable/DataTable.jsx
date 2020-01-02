import React from "react";

import DataTableLink from "./DataTableLink";

import styles from "./DataTable.module.less";

export default function DataTable(props) {
  return (
    <table className={styles["datatable"]}>
      <thead>
        <tr>
          <th>#</th>
          <th>Id</th>
          <th>Transportation</th>
          <th>User</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>wer1-g4gd-bhwr</td>
          <td>delivering</td>
          <td>Zhest S.S.</td>
          <td>23.05.2019 12:50</td>
          <td><DataTableLink to={"/QWER-1234-HJKL"} /></td>
        </tr><tr>
          <td>1</td>
          <td>wer1-g4gd-bhwr</td>
          <td>delivering</td>
          <td>Zhest S.S.</td>
          <td>23.05.2019 12:50</td>
          <td><DataTableLink to={"/QWER-1234-HJKL"} /></td>
        </tr><tr>
          <td>1</td>
          <td>wer1-g4gd-bhwr</td>
          <td>delivering</td>
          <td>Zhest S.S.</td>
          <td>23.05.2019 12:50</td>
          <td><DataTableLink to={"/QWER-1234-HJKL"} /></td>
        </tr><tr>
          <td>1</td>
          <td>wer1-g4gd-bhwr</td>
          <td>delivering</td>
          <td>Zhest S.S.</td>
          <td>23.05.2019 12:50</td>
          <td><DataTableLink to={"/QWER-1234-HJKL"} /></td>
        </tr>
      </tbody>
    </table>
  );
}
import React from "react";

import { TABLE_STYLES } from "../../../../parts/DataTable/DataTable";

export default function DataTableHeader(props) {
  return (
    <tr>
      <th>#</th>
      <th>Id</th>
      <th>State</th>
      <th>Passport no.</th>
      <th className={TABLE_STYLES.CENTER}>Former scan</th>
      <th className={TABLE_STYLES.CENTER}>Latter scan</th>
      <th>Time</th>
      <th className={TABLE_STYLES.FIT}></th>
    </tr>
  );
}
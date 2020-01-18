import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";

export default function DataTableHeader(props) {
  return (
    <tr>
      <th>#</th>
      <th>Full name</th>
      <th>Short name</th>
      <th>Type</th>
      <th>Receptions</th>
      <th className={TABLE_STYLES.CENTER}>Self controled</th>
      <th className={TABLE_STYLES.CENTER}>Options</th>
    </tr>
  );
}
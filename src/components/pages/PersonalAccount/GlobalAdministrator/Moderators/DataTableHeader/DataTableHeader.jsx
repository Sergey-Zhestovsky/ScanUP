import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";

export default function DataTableHeader(props) {
  return (
    <tr>
      <th>#</th>
      <th>Email</th>
      <th>Transport system</th>
      <th>Abbreviation</th>
      <th className={TABLE_STYLES.CENTER}>Self control</th>
      <th className={TABLE_STYLES.FIT}>Reception</th>
    </tr>
  );
}
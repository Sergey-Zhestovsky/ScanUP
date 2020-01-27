import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";

export default function DataTableHeader(props) {
  return (
    <tr>
      <th>#</th>
      <th>Baggage</th>
      <th>Passport No.</th>
      <th>Reason</th>
      <th>Title</th>
      <th className={TABLE_STYLES.FIT}></th>
    </tr>
  );
}
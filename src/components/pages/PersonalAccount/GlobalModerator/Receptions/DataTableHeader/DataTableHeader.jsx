import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";

export default function DataTableHeader(props) {
  return (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Scanner No.</th>
      <th className={TABLE_STYLES.CENTER}>Moderated</th>
      <th className={TABLE_STYLES.FIT}>Moderator email</th>
    </tr>
  );
}
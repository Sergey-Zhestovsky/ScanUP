import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";
import CheckState from "../../../../../utils/CheckState/CheckState";

export default function DataTableRow(props) {
  let {
    index,
    object = {}
  } = props;

  return (
    <tr>
      <td>{index}</td>
      <td>{object.name}</td>
      <td>{object.scanner.uId}</td>
      <td className={TABLE_STYLES.CENTER}>
        <CheckState checked={object.moderator} />
      </td>
      <td className={TABLE_STYLES.FIT}>
        {object.moderator && object.moderator.email}
      </td>
    </tr>
  );
}
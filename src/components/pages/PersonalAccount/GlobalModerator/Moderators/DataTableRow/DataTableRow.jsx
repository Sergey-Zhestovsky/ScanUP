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
      <td>{object.email}</td>
      <td>{object.transportSystem.fullName}</td>
      <td>{object.transportSystem.shortName}</td>
      <td className={TABLE_STYLES.CENTER}>
        <CheckState checked={object.transportSystem.selfControl} />
      </td>
      <td className={TABLE_STYLES.FIT}>
        {object.transportSystemReception.name}
      </td>
    </tr>
  );
}
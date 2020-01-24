import React from "react";

import { TABLE_STYLES, Link } from "../../../../parts/DataTable/DataTable";
import CheckState from "../../../../../../utils/CheckState/CheckState";
import formatOutput from "../../../../../../../modules/formatOutput";

export default function DataTableRow(props) {
  let {
    index,
    object = {}
  } = props;

  return (
    <tr>
      <td>{index}</td>
      <td>{object.uId}</td>
      <td>{object.transportationState.state}</td>
      <td>{object.passport}</td>
      <td className={TABLE_STYLES.CENTER}>
        <CheckState checked={object.formerScanId} />
      </td>
      <td className={TABLE_STYLES.CENTER}>
        <CheckState checked={object.latterScanId} />
      </td>
      <td>
        {
          object.formerScanId && object.formerScan.time &&
          formatOutput(object.formerScan.time, { as: "short time" })
        }
      </td>
      <td className={TABLE_STYLES.FIT}>
        <Link to={`/${object.uId}`} />
      </td>
    </tr>
  );
}
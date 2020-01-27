import React from "react";

import { TABLE_STYLES, ButtonsGroup, Button } from "../../../parts/DataTable/DataTable";
import CheckState from "../../../../../utils/CheckState/CheckState";

export default function DataTableRow(props) {
  let {
    index,
    object = {},
    viewHandler
  } = props;

  return (
    <tr>
      <td>{index}</td>
      <td>{object.baggage.uId}</td>
      <td>{object.baggage.passport}</td>
      <td>{object.reason.name}</td>
      <td>
        {
          object.title || <CheckState checked={false} />
        }
      </td>
      <td className={TABLE_STYLES.FIT}>
        <ButtonsGroup>
          <Button onClick={viewHandler}>Show</Button>
        </ButtonsGroup>
      </td>
    </tr>
  );
}
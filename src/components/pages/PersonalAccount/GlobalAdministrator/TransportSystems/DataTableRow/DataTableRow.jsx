import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";
import { ButtonsGroup, Button } from "../../../parts/DataTable/DataTable";
import { BUTTON_STYLE } from "../../../../../utils/Button/Button";
import CheckState from "../../../../../utils/CheckState/CheckState";

export default function DataTableRow(props) {
  let {
    index,
    object = {},
    deleteHandler = () => { },
    viewHandler = () => { }
  } = props;

  return (
    <tr>
      <td>{index}</td>
      <td>{object.fullName}</td>
      <td>{object.shortName}</td>
      <td>{object.type.name}</td>
      <td>{object.receptions}</td>
      <td className={TABLE_STYLES.CENTER}>
        <CheckState checked={object.selfControl} />
      </td>
      <td className={TABLE_STYLES.FIT}>
        <ButtonsGroup>
          {
            object.receptions === 0 &&
            <Button style={BUTTON_STYLE.WARNING} onClick={deleteHandler}>Delete</Button>
          }
          <Button onClick={viewHandler}>Show</Button>
        </ButtonsGroup>
      </td>
    </tr>
  );
}
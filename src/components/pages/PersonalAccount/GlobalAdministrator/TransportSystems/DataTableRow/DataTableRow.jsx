import React from "react";

import { TABLE_STYLES } from "../../../parts/DataTable/DataTable";
import { ButtonsGroup, Button } from "../../../parts/DataTable/DataTable";
import { BUTTON_STYLE } from "../../../../../utils/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import concatClasses from "../../../../../../modules/concatClasses";

import styles from "../transportSystems.module.less";

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
        {
          object.selfControl
            ? <FontAwesomeIcon
              className={concatClasses(styles["check-icon"], styles["check"])}
              icon={faCheckCircle} />
            : <FontAwesomeIcon
              className={concatClasses(styles["check-icon"], styles["times"])}
              icon={faTimesCircle} />
        }
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
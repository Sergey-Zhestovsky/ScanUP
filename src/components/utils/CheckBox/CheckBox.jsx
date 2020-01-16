import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";


import styles from "./checkBox.module.less"

export default function CheckBox(props) {
  let {
    name,
    onChange,
    value = false
  } = props;

  function changeHandler(event) {
    let name = event.target.name,
      value = event.target.checked;

    return onChange(name, value);
  }

  return (
    <label className={styles["checkbox-wrapper"]}>
      <FontAwesomeIcon className={styles["checkbox-icon"]} icon={value ? faCheckSquare : faSquare} />
      <input name={name} type="checkbox" onChange={changeHandler} checked={value} hidden />
    </label>
  );
}
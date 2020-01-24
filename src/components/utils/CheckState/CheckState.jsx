import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import concatClasses from "../../../modules/concatClasses";

import styles from "./checkState.module.less";

export default function CheckState(props) {
  let {
    checked = false,
    className
  } = props;

  if (checked)
    return <FontAwesomeIcon
      className={concatClasses(styles["check-icon"], styles["check"], className)}
      icon={faCheckCircle} />;

  return <FontAwesomeIcon
    className={concatClasses(styles["check-icon"], styles["times"], className)}
    icon={faTimesCircle} />;
}
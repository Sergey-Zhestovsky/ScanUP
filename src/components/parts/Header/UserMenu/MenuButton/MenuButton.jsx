import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../UserMenu.module.less";

export default function MenuButton(props) {
  return (
    <div className={styles["menu-link"]} onClick={props.onClick}>
      <FontAwesomeIcon className={styles["link-icon"]} icon={props.icon} />
      <div className={styles["link-name"]}>{props.name}</div>
    </div>
  );
}
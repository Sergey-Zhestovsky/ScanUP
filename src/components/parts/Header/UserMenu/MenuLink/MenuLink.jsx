import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../UserMenu.module.less";

export default function MenuLink(props) {
  return (
    <Link to={props.to} className={styles["menu-link"]} onClick={props.onClick}>
      <FontAwesomeIcon className={styles["link-icon"]} icon={props.icon} />
      <div className={styles["link-name"]}>{props.name}</div>
    </Link>
  );
}
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./UserMenu.module.less";

export default function UserMenu(props) {
  return (
    <div className={styles.menu}>
      <FontAwesomeIcon className={styles.avatar} icon={faUser} />
      <FontAwesomeIcon className={styles["enter-icon"]} icon={faCaretDown} />
    </div>
  );
}
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./PopUp.module.less";

export default function PopUp(props) {
  let {
    closeHandler: close = () => { }
  } = props;
  function closeHandler(event) {
    if (event.target === event.currentTarget)
      return close();
  }

  return (
    <div className={styles["popup-wrapper"]} onClick={closeHandler}>
      <div className={styles["popup"]}>
        {props.children}
      </div>
    </div>
  );
}

export function PopUpTitle(props) {
  let {
    closeHandler = () => { }
  } = props;

  return (
    <div className={styles["popup-title"]}>
      <div className={styles["popup-title-name"]}>
        {props.children}
      </div>
      <div
        className={styles["popup-title-close-btn"]}
        onClick={closeHandler}>
        <FontAwesomeIcon className={styles["popup-title-close-icon"]} icon={faTimes} />
      </div>
    </div >
  );
}
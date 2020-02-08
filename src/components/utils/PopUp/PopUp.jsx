import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Transition, { TRANSITION_STYLES } from "../Transition/Transition";

import styles from "./PopUp.module.less";

export default function PopUp(props) {
  let [isClosed, setClose] = useState(false);

  let {
    closeHandler: close = () => { },
    isActive = true,
    children,
    style,
    animated = true,
    timeout
  } = props;

  timeout = animated ? timeout : 0;

  function closingHandler(event) {
    if (event.target === event.currentTarget)
      return setClose(true);
  }

  function closeHandler(event) {
    setClose(false);
    close();
  }

  return (
    <Transition
      in={!isClosed && isActive}
      timeout={timeout}
      style={style || TRANSITION_STYLES.FADE}
      unmountOnExit
      onExited={closeHandler}
      appear>
      <div className={styles["popup-wrapper"]} onClick={closingHandler}>

        <Transition
          in={!isClosed && isActive}
          timeout={timeout}
          style={TRANSITION_STYLES.HOP}
          appear
          unmountOnExit>
          <div className={styles["popup"]}>
            {children}
          </div>
        </Transition>

      </div>
    </Transition>
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
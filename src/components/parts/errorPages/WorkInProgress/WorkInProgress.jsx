import React from "react";
import { ReactComponent as WarnLogo } from "../../../../svg/priority.svg";
import Transition, { TRANSITION_STYLES } from "../../../utils/Transition/Transition";

import styles from "./workInProgress.module.less";

export default function WorkInProgress(props) {
  return (
    <Transition in={true} style={TRANSITION_STYLES.HOP} appear>
      <div className={styles["main-block"]}>
        <Transition in={true} style={TRANSITION_STYLES.FADE} appear>
          <div className={styles["alert"]}>
            <WarnLogo className={styles["alert-image"]} />
            <div className={styles["alert-text"]}>WORK IN PROGRESS</div>
          </div>
        </Transition>
      </div>
    </Transition>
  );
}
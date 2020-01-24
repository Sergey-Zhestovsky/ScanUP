import React from "react";

import Spinner from "../../../../utils/Spinner/Spinner";

import styles from "./bodySpinner.module.less";

export default function BodySpinner(props) {
  return (
    <div className={styles["main-spinner-wrapper"]}>
      <Spinner backgroundClass={styles["backgrounbd-style"]} />
    </div>
  );
}
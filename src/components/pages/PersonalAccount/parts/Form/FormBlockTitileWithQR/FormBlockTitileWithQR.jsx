import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

import concatClasses from "../../../../../../modules/concatClasses";
import Button from "../../../../../utils/Button/Button";

import styles from "../Form.module.less";

export default function FormBlockTitileWithQR(props) {
  return (
    <div className={concatClasses(styles["form-block-title"], props.className)}>
      {props.children}
      <Button onClick={props.qrClickHandler} className={styles["qr-button"]}>
        <FontAwesomeIcon icon={faQrcode} className={styles["qr-button-icon"]} />
      </Button>
    </div>
  );
}
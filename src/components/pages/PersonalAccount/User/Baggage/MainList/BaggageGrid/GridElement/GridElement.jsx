import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import concatClasses from "../../../../../../../../modules/concatClasses";

import styles from "../baggageGrid.module.less";

export default function GridElement(props) {
  let baggage = props.baggage,
    dataLineStyle = styles["baggage-data-line"];

  return (
    <div className={styles["grid-element"]}>
      <div className={styles["baggage-image"]}>
        {
          baggage.formerScan.image
            ? <img src={baggage.formerScan.image} alt="" />
            : <FontAwesomeIcon className={styles["baggage-image-cover"]} icon={faSuitcaseRolling} />
        }
      </div>
      <div className={styles["baggage-data-group"]}>
        <div className={concatClasses(dataLineStyle, styles["baggage-ts"])}>
          {baggage.formerScan.manager.transportSystem.fullName}
        </div>
        <div className={concatClasses(dataLineStyle, styles["baggage-uid"])}>
          {baggage.uId}
        </div>
        <div className={concatClasses(dataLineStyle, styles["baggage-time"])}>
          {
            moment(baggage.formerScan.time).calendar()
          }
        </div>
      </div>
    </div>
  );
}
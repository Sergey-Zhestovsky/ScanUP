import React from "react";

import BaggageTicket from "../BaggageTicket/BaggageTicket";
import UserTicket from "../UserTicket/UserTicket";
import concatClasses from "../../../../../../../modules/concatClasses";

import styles from "./allTickets.module.less";

export default function AllTickets(props) {
  if (!props.baggage)
    return null;

  return (
    <div className={styles["tickets-wrapper"]}>
      <div className={styles["tickets-col"]}>
        <div className={styles["tickets-block"]}>
          <BaggageTicket baggage={props.baggage} />
        </div>
      </div>
      <div className={styles["tickets-col"]}>
        <div className={concatClasses(styles["tickets-block"], styles["left-ticket-block"])}>
          <UserTicket baggage={props.baggage} />
        </div>
      </div>
    </div>
  );
}
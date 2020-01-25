import React from "react";
import QRCode from "qrcode.react";
import moment from "moment";

import styles from "./userTicket.module.less";

export default function UserTicket(props) {
  let baggage = props.baggage;

  if (!baggage)
    return null;

  let scan = baggage.formerScan,
    ts = scan.manager.transportSystem,
    reception = scan.manager.transportSystemReception,
    date = moment(scan.time).format("dddd MM.DD.YYYY"),
    time = moment(scan.time).format("hh:mm:ss a"),
    scanner = reception.scanner.uId.slice(0, 14);

  return (
    <div className={styles["ticket"]}>
      <div className={styles["ticket-sing"]}>
        <div className={styles["ticket-sing-group"]}>
          <div className={styles["sing-logo"]}>
            <img
              className={styles["sing-logo-img"]}
              src="/public/images/site/logo-60-white.png"
              alt="logo" />
          </div>
          <div className={styles["sing-name"]}>ScanUP</div>
        </div>
        <div className={styles["ticket-sing-group"]}>
          <div className={styles["sing-context"]}>Owner's ticket</div>
        </div>
      </div>
      <div className={styles["ticket-main"]}>
        <div className={styles["main-header"]}>
          <div className={styles["header-group"]}>
            <div className={styles["header-ts"]}>{ts.shortName}</div>
          </div>
          <div className={styles["header-group"]}>
            <div className={styles["header-date"]}>{date}</div>
            <div className={styles["header-uid"]}>{baggage.uId}</div>
          </div>
        </div>
        <div className={styles["main-body"]}>
          <div className={styles["description-line"]}>
            <Description name="Transport system" value={ts.fullName} />
          </div>
          <div className={styles["description-line"]}>
            <Description name="Reception" value={reception.name} />
            <Description name="Manager" value={scan.manager.name} />
            <Description name="Time" value={time} />
          </div>
          <div className={styles["description-line"]}>
            <Description name="Scanner" value={scanner} />
            <Description name="Weight" value={scan.weight + "kg."} />
            <Description name="Summary" value={scan.summary + "%"} />
          </div>
        </div>
      </div>
      <div className={styles["ticket-qr"]}>
        <QRCode value={baggage.uId} renderAs="svg" size={212} bgColor="#f9f9f9" />
      </div>
    </div>
  );
}

function Description(props) {
  return (
    <div className={styles["description-block"]}>
      <div className={styles["description-block-name"]}>{props.name}</div>
      <div className={styles["description-block-context"]}>{props.value}</div>
    </div>
  );
}
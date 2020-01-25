import React from "react";
import QRCode from "qrcode.react";
import moment from "moment";

import styles from "./baggageTicket.module.less";

export default function BaggageTicket(props) {
  let baggage = props.baggage;

  if (!baggage)
    return null;

  let scan = baggage.formerScan,
    ts = scan.manager.transportSystem,
    reception = scan.manager.transportSystemReception,
    date = moment(scan.time).format("DD MMMM"),
    time = moment(scan.time).format("hh:mm:ss a"),
    scanner = reception.scanner.uId.slice(0, 14);

  return (
    <div className={styles["ticket"]}>
      <div className={styles["container-wrapper"]}>
        <div className={styles["container"]}>
          <div className={styles["ticket-sing-group"]}>
            <div className={styles["sing-context"]}>Baggage ticket</div>
          </div>
          <div className={styles["ticket-sing-group"]}>
            <div className={styles["sing-logo"]}>
              <img
                className={styles["sing-logo-img"]}
                src="/public/images/site/logo-60.png"
                alt="logo" />
            </div>
            <div className={styles["sing-name"]}>ScanUP</div>
          </div>
        </div>
        <div className={styles["container"]}>
          <div className={styles["main-line"]}>
            <div className={styles["ts-abbreviation"]}>{ts.shortName}</div>
          </div>
          <div className={styles["main-line"]}>
            <div className={styles["ts-name"]}>{ts.fullName}</div>
          </div>
          <div className={styles["main-line"]}>
            <div className={styles["main-date"]} data-date={date}>{time}</div>
          </div>
          <div className={styles["main-line"]}>
            <Description name="Reception" value={reception.name} />
            <Description name="Manager" value={scan.manager.name} />
            <Description name="Scanner" value={reception.scanner.uId} />
          </div>
          <div className={styles["main-line"]}>
            <div className={styles["qr-code-block"]}>
              <div className={styles["qr-code-wrapper"]}>
                <QRCode className={styles["qr-code"]} value={baggage.uId} renderAs="svg" size={212} bgColor="#f9f9f9" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["container"]}>
          <div className={styles["main-line"]}>
            <div className={styles["barcode-title"]}>Baggage barcode</div>
            <div className={styles["barcode"]}>
              <img
                className={styles["barcode-img"]}
                src="/public/images/site/bc.png"
                alt="barcode" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["barcode-side"]}>
        <img
          className={styles["barcode-img"]}
          src="/public/images/site/bc.png"
          alt="barcode" />
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
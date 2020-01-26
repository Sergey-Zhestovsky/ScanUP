import React from "react";
import QRCode from "qrcode.react";

import PopUp, { PopUpTitle } from "../../PopUp";
import { Form, FORM_STYLES, FormBlock } from "../../../../pages/PersonalAccount/parts/Form/Form";

import styles from "./qrPopup.module.less";

export default function QRPopup(props) {
  let {
    closeHandler,
    value,
    size = 250,
    color,
    bgColor = "#f9f9f9"
  } = props;

  return (
    <PopUp closeHandler={closeHandler}>
      <PopUpTitle closeHandler={closeHandler} >QR code</PopUpTitle>
      <Form>
        <FormBlock style={FORM_STYLES.CENTER_FORM}>
          <QRCode
            className={styles["qr-code"]}
            value={value}
            renderAs="svg"
            size={size}
            bgColor={bgColor} />
        </FormBlock>
      </Form>
    </PopUp>
  );
}
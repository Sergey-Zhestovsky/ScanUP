import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Button from "../../../utils/Button/Button";

import styles from "./registrationAlert.module.less";

export default function RegistrationAlert(props) {
  if (!props.passport)
    return null;

  return (
    <CSSTransition in={true} timeout={200} appear classNames={{...styles}}>
      <div className={styles["registration-alert-wrapper"]}>
        <div className={styles["registration-alert"]}>
          <div className={styles["message"]}>Seems like you are not registered yet, so</div>
          <Link to={{
            pathname: "/signup",
            state: { passport: props.passport }
          }}>
            <Button className={styles["button"]}>Sign up</Button>
          </Link>
        </div>
      </div>
    </CSSTransition>
  );
}
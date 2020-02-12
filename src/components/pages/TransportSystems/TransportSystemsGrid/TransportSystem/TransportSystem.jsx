import React from "react";

import Transition from "../../../../utils/Transition/Transition"

import styles from "./transportSystem.module.less";

export default function TransportSystem(props) {
  let {
    element,
    delay,
    show
  } = props;

  return (
    <Transition in={show} timeout={750} delay={delay} style={styles}>
      <div className={styles["wrapper"]}>
        <div className={styles["background"]}>
          <div className={styles["ts"]}>
            <div className={styles["image"]}></div>
            <div className={styles["name"]}>{element.fullName}</div>
            <div className={styles["description"]}>
              <div className={styles["field-group"]}>
                <Field>{element.type.name}</Field>
                <Field>{element.shortName}</Field>
              </div>
              <div className={styles["field-group"]}>
                <Field name="Receptions available">{element.receptionsCount}</Field>
                <Field name="Amount of workers">{element.moderatorsCount}</Field>
                <Field name="Baggages delivered">{element.baggagesCount}</Field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

function Field(props) {
  let {
    name,
    children
  } = props;
  return (
    <div className={styles["field"]}>
      {
        name && <div className={styles["field-name"]}>{name}</div>
      }
      <div className={styles["field-value"]}>{children}</div>
    </div>
  );
}

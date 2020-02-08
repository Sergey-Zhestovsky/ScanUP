import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import concatClasses from "../../../../../modules/concatClasses";
import BackLink from "../../../../utils/BackLink/BackLink";

import styles from "./Title.module.less";

export const titleStyle = {
  CAPITAL: styles["capital"]
};

export default function Title(props) {
  let optionalStyle = props.style;

  return (
    <div className={concatClasses(styles.title, optionalStyle, props.className)}>
      {props.children}
    </div>
  );
}

export function TitleBackLink(props) {
  return (
    <BackLink className={styles["back-link"]}>
      <FontAwesomeIcon
        className={styles["back-link-icon"]}
        icon={faChevronLeft} />back
    </BackLink>
  );
}
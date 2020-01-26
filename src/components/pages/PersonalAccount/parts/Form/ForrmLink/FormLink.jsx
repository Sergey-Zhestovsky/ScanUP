import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import styles from "../Form.module.less";

export default function FormLink(props) {
  let {
    children,
    to,
    icon,
    ...rest
  } = props;
  return (
    <div className={styles["link-block"]}>
      <Link to={to} className={styles["link"]} {...rest}>
        {
          icon &&
          <FontAwesomeIcon className={styles["link-icon"]} icon={icon} />
        }
        {children}
        <FontAwesomeIcon className={styles["link-arrow"]} icon={faChevronRight} />
      </Link>
    </div>
  );
}

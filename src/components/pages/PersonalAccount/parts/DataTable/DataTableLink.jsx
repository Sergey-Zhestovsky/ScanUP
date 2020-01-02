import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import RelativeLink from "../../../../utils/RelativeLink/RelativeLink";

import styles from "./DataTable.module.less";

export default function DataTableLink(props) {
  let {
    children = <React.Fragment>
      more <FontAwesomeIcon className={styles["link-icon"]} icon={faChevronRight} />
    </React.Fragment>,
    to
  } = props;
  
  return (
    <RelativeLink className={styles["link"]} to={to}>{children}</RelativeLink>
  );
}
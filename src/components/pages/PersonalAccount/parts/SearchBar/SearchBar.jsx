import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Input from "../../../../utils/Input/Input";
import styles from "./SearchBar.module.less";

export default function SearchBar(props) {
  return (
    <div className={styles["searchbar"]}>
      <Input className={styles["searchbar-input"]} {...props} />
      <div className={styles["searchbar-icon"]}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}
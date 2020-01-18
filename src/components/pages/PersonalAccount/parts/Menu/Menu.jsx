import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Menu.module.less";
import RelativeLink from "../../../../utils/RelativeLink/RelativeLink";

export default function Menu(props) {
  function getListFromMenu(menu) {
    let result = [];

    for (let key in menu) {
      let el = menu[key]
      result.push(
        <RelativeLink nav to={el.link} key={result.length}
          className={styles["element"]}
          activeClassName={styles["active"]}>
          <FontAwesomeIcon className={styles["icon"]} icon={el.icon} />
          {el.name}
        </RelativeLink>
      );
    }

    return result;
  }

  return (
    <div className={styles["side-menu"]}>
      {
        props.list && getListFromMenu(props.list)
      }
    </div>
  );
}

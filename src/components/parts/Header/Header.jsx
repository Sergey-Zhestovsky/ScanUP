import React from "react";

import UserMenu from "./UserMenu/UserMenu";
import concatClasses from "../../../modules/concatClasses";

import styles from "./Header.module.less";

export const HEADER_STYLE = {
  default: Symbol("default"),
  account: Symbol("account")
}

const styleClass = {
  [HEADER_STYLE.account]: styles["account"]
};

export default function Header(props) {
  let style = styleClass[props.styleClass];

  return (
    <header className={concatClasses(style, styles.header)}>
      <div className={styles["icon-block"]}>
        <div className={styles["icon-wrapper"]}>
          <img className={styles["icon-name"]} src="/public/images/site/ScanUP.png" />
        </div>
      </div>
      <div className={styles["menu-wrapper"]}>
        <nav className={styles.menu}>
          <div className={styles["menu-elements"]}>Home</div>
          <div className={styles["menu-elements"]}>Transport systems</div>
          <div className={styles["menu-elements"]}>About us</div>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
}
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./Logo/Logo";
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

function Header(props) {
  let style = styleClass[props.styleClass];
console.log(props.isAuthorized)
  return (
    <header className={concatClasses(style, styles.header)}>
      <div className={styles["logo-block"]}>
        <Logo />
      </div>
      <div className={styles["menu-wrapper"]}>
        <nav className={styles.menu}>
          <Link className={styles["menu-elements"]} to="/">Home</Link>
          <Link className={styles["menu-elements"]} to="/">Transport systems</Link>
          <Link className={styles["menu-elements"]} to="/">About us</Link>
        </nav>
        {
          props.isAuthorized
            ? <UserMenu />
            : <Link className={styles["button"]} to="/login">Log in</Link>
        }
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized
  };
}

export default connect(mapStateToProps)(Header);
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./Logo/Logo";
import UserMenu from "./UserMenu/UserMenu";
import concatClasses from "../../../modules/concatClasses";
import HEADER_STYLE from "../../../data/styles/headerStyles";

import styles from "./Header.module.less";

export { HEADER_STYLE };

const headerClasses = {
  [HEADER_STYLE.default]: styles["default"],
  [HEADER_STYLE.ACCOUNT]: styles["account"],
  [HEADER_STYLE.MAIN_PAGE]: styles["main-page"],
  [HEADER_STYLE.TRANSPORT_SYSTEM]: styles["transport-system"]
}

function Header(props) {
  let headerClass = headerClasses[props.style];

  return (
    <header className={concatClasses(headerClass, styles.header)}>
      <div className={styles["logo-block"]}>
        <Logo />
      </div>
      <div className={styles["menu-wrapper"]}>
        <nav className={styles.menu}>
          <Link className={styles["menu-elements"]} to="/">Home</Link>
          <Link className={styles["menu-elements"]} to="/transport-systems">Transport systems</Link>
          <Link className={styles["menu-elements"]} to="/about">About us</Link>
        </nav>
        {
          props.isAuthorized
            ? <UserMenu style={props.style} />
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
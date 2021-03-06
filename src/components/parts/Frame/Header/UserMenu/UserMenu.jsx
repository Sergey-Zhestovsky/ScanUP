import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { authActions } from "../../../../../storage/actions";
import { CSSTransition } from "react-transition-group";
import concatClasses from "../../../../../modules/concatClasses";
import MenuLink from "./MenuLink/MenuLink";
import MenuButton from "./MenuButton/MenuButton";
import HEADER_STYLE from "../../../../../data/styles/headerStyles";

import styles from "./UserMenu.module.less";

const userMenuClasses = {
  [HEADER_STYLE.default]: styles["default"],
  [HEADER_STYLE.ACCOUNT]: styles["account"],
  [HEADER_STYLE.MAIN_PAGE]: styles["main-page"],
  [HEADER_STYLE.TRANSPORT_SYSTEM]: styles["transport-system"]
}

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.menuRef = React.createRef();
    this.animationMenuClasses = {
      appear: styles["appear"],
      appearActive: styles["appear-active"],
      appearDone: styles["appear-done"]
    };
  }

  openMenu = () => {
    document.addEventListener("click", this.outerClickHandler);

    return this.setState({
      open: true
    });
  }

  closeMenu = () => {
    document.removeEventListener("click", this.outerClickHandler);

    return this.setState({
      open: false
    });
  }

  toggleMenu = () => {
    this.state.open ? this.closeMenu() : this.openMenu();
  }

  outerClickHandler = (event) => {
    if (!this.menuRef.current.contains(event.target)) {
      this.closeMenu();

      return true;
    }

    return false;
  }

  exitHandler = (e) => {
    return this.props.logout();
  }

  render() {
    let activeClass = this.state.open ? styles["active"] : null,
      stickClass = this.props.stick ? styles["stick"] : null,
      userMenuClass = userMenuClasses[this.props.style];

    return (
      <div className={concatClasses(styles["menu"], userMenuClass, activeClass, stickClass)} ref={this.menuRef}>
        <div className={styles["menu-wrapper"]}>
          <div className={styles["name"]}>{this.props.userName}</div>
          <FontAwesomeIcon className={styles["enter-icon"]} icon={faBars} onClick={this.toggleMenu} />
        </div>
        <CSSTransition in={this.state.open} timeout={175} unmountOnExit>
          <div className={styles["dropdown-menu-wrapper"]}>
            <CSSTransition in={this.state.open} timeout={175} classNames={this.animationMenuClasses} appear unmountOnExit>
              <div className={styles["dropdown-menu"]}>
                <MenuLink to="/account" icon={faUserAlt} name="Account" onClick={this.closeMenu} />
                <MenuButton onClick={(e) => { this.exitHandler(e); this.closeMenu(); }} icon={faSignOutAlt} name="Exit" />
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.details.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(authActions.logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
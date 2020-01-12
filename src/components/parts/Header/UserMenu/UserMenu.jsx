import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import concatClasses from "../../../../modules/concatClasses";
import MenuLink from "./MenuLink/MenuLink";
import MenuButton from "./MenuButton/MenuButton";

import styles from "./UserMenu.module.less";

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.menuRef = React.createRef();
    this.animationMenuClasses = {
      enter: styles["enter"],
      enterActive: styles["enter-active"],
      enterDone: styles["enter-done"],
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
    console.log('exit!');
  }

  render() {
    let activeClass = this.state.open ? styles["active"] : null;

    return (
      <div className={concatClasses(styles["menu"], activeClass)} ref={this.menuRef}>
        <div className={styles["menu-wrapper"]}>
          <div className={styles["name"]}>Zhestovsky Sergey</div>
          <FontAwesomeIcon className={styles["enter-icon"]} icon={faBars} onClick={this.toggleMenu} />
        </div>
        <CSSTransition in={this.state.open} timeout={175} classNames={this.animationMenuClasses} unmountOnExit>
          <div className={styles["dropdown-menu"]}>
            <MenuLink to="/account" icon={faUserAlt} name="Account" onClick={this.closeMenu} />
            <MenuButton onClick={(e) => { this.exitHandler(e); this.closeMenu(); }} icon={faSignOutAlt} name="Exit" />
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default UserMenu;
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "./Logo/Logo";
import UserMenu from "./UserMenu/UserMenu";
import concatClasses from "../../../modules/concatClasses";
import HEADER_STYLE from "../../../data/styles/headerStyles";

import styles from "./Header.module.less";

export { HEADER_STYLE };

const HeaderPosition = {
  fixed: Symbol("fixed"),
  relative: Symbol("relative")
};

const headerStyle = {
  [HEADER_STYLE.default]: { class: styles["default"], position: HeaderPosition.fixed },
  [HEADER_STYLE.ACCOUNT]: { class: styles["account"], position: HeaderPosition.relative },
  [HEADER_STYLE.MAIN_PAGE]: { class: styles["main-page"], position: HeaderPosition.fixed },
  [HEADER_STYLE.TRANSPORT_SYSTEM]: { class: styles["transport-system"], position: HeaderPosition.fixed }
};

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stick: null,
      observe: false
    };
  }

  componentDidMount() {
    this.stickHandler();
    this.scrollHandler();
  }

  componentDidUpdate() {
    this.stickHandler();
  }

  stickHandler() {
    let position = headerStyle[this.props.style].position;

    if (position === HeaderPosition.fixed && this.state.observe === false) {
      this.setState({ observe: true });
      return window.addEventListener("scroll", this.scrollHandler);
    }

    if (position === HeaderPosition.relative && this.state.observe === true) {
      this.setState({ observe: false });
      return window.removeEventListener("scroll", this.scrollHandler);
    }
  }

  scrollHandler = () => {
    this.setState({ stick: !window.scrollY });
  }

  render() {
    let headerClass = headerStyle[this.props.style].class,
      stickClass = this.state.stick ? styles["stick"] : null;

    return (
      <header className={concatClasses(headerClass, styles.header, stickClass)}>
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
            this.props.isAuthorized
              ? <UserMenu style={this.props.style} />
              : <Link className={styles["button"]} to="/login">Log in</Link>
          }
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized
  };
}

export default connect(mapStateToProps)(Header);
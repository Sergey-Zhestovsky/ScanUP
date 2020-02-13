import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import Logo from "./Logo/Logo";
import UserMenu from "./UserMenu/UserMenu";
import concatClasses from "../../../../modules/concatClasses";
import HEADER_STYLE from "../../../../data/styles/headerStyles";

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
      style: null,
      stick: true,
      observe: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    state.style = props.style ?? HEADER_STYLE.default;

    return state;
  }

  componentDidMount() {
    this.stickHandler();
    this.scrollHandler();
  }

  componentDidUpdate() {
    this.stickHandler();
  }

  stickHandler() {
    let position = headerStyle[this.state.style].position;

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
    let headerClass = headerStyle[this.state.style].class,
      stickClass = this.state.stick ? styles["stick"] : null;

    return (
      <header className={concatClasses(headerClass, styles["header-wrapper"])}>
        <div className={concatClasses(headerClass, styles["header"], stickClass)}>
          <div className={styles["logo-block"]}>
            <Logo />
          </div>
          <div className={styles["menu-wrapper"]}>
            <nav className={styles.menu}>
              <NavLink
                className={styles["menu-elements"]}
                activeClassName={styles["active"]}
                to="/"
                exact
              >Home</NavLink>
              <NavLink
                className={styles["menu-elements"]}
                activeClassName={styles["active"]}
                to="/transport-systems"
              >Transport systems</NavLink>
              <NavLink
                className={styles["menu-elements"]}
                activeClassName={styles["active"]}
                to="/about"
              >About us</NavLink>
              <NavLink
                className={styles["menu-elements"]}
                activeClassName={styles["active"]}
                to="/policy"
              >Policy</NavLink>
            </nav>
            {
              this.props.isAuthorized
                ? <UserMenu style={this.state.style} stick={this.state.stick} />
                : <Link className={styles["button"]} to="/login">Log in</Link>
            }
          </div>
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
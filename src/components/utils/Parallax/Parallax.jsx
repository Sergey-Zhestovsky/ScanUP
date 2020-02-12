import React, { PureComponent } from "react";

import styles from "./parallax.module.less";

export const Direction = {
  TO_BOTTOM: Symbol("to-bottom")
};

class Parallax extends PureComponent {
  state = {
    position: null // 0 <= n <= target.offsetTop + target.clientHeight
  }

  componentDidMount() {
    this.getWindowPosition();
    window.addEventListener('scroll', this.getWindowPosition);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.target) {
      let offSet = state.position - props.target.offsetTop,
        percent = offSet / props.target.clientHeight;

      if (offSet < 0)
        return { position: 0 };

      if (offSet > props.target.clientHeight)
        return { position: 1 };

      return { position: percent };
    }

    return null;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.getWindowPosition);
  }

  getWindowPosition = (e) => {
    return this.setState({
      position: window.scrollY
    });
  }

  render() {
    let {
      distance = 1,
      tempo = 1,
      children
    } = this.props;

    let style = {
      transform: `translate(0, ${this.state.position * 100 * distance}%)`,
      opacity: 1 - (this.state.position * tempo)
    };

    return (
      <div className={styles["wrapper"]} style={style}>
        {children}
      </div>
    );
  }
}

export default Parallax;
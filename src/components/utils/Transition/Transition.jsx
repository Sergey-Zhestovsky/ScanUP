import React, { Component } from "react";

import { CSSTransition } from "react-transition-group";

import stylesFade from "./transition-fade.module.less";
import stylesHop from "./transition-hop.module.less";
import stylesSoftHop from "./transition-soft-hop.module.less";

export const TRANSITION_STYLES = {
  FADE: stylesFade,
  HOP: stylesHop,
  SOFT_HOP: stylesSoftHop
};

export default class Transition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.in,
      timer: null
    };
  }

  componentDidUpdate() {
    if (!this.props.delay)
      return;

    if (this.state.show !== this.props.in && this.state.timer === null) {
      this.setTimer();
    }
  }

  setTimer() {
    clearTimeout(this.state.timer);
    this.setState({
      timer: setTimeout(() => this.setState({
        show: this.props.in,
        timer: null
      }), this.props.delay ?? 0)
    })
  }

  render() {
    let {
      timeout = 200,
      style,
      delay,
      children,
      ...rest
    } = this.props;

    return (
      <CSSTransition
        timeout={timeout}
        classNames={timeout === 0 ? {} : style}
        {...rest}
        in={delay ? this.state.show : this.props.in}
      >
        {children}
      </CSSTransition>
    );
  }
}
import React from "react";

import { CSSTransition } from "react-transition-group";

import stylesFade from "./transition-fade.module.less";
import stylesHop from "./transition-hop.module.less";

export const TRANSITION_STYLES = {
  FADE: stylesFade,
  HOP: stylesHop
};

export default function Transition(props) {
  let {
    timeout = 200,
    style,
    ...rest
  } = props;

  return (
    <CSSTransition
      timeout={timeout}
      classNames={timeout === 0 ? {} : style}
      {...rest}>
      {props.children}
    </CSSTransition>
  );
}
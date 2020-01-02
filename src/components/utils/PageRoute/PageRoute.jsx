import React from "react";
import { Route } from "react-router-dom";

import Frame from "../../pages/Frame/Frame";

export default function PageRoute(props) {
  let {
    to,
    exact = false,
    component: Component,
    ...rest
  } = props;

  return (
    <Route path={to} exact={exact} render={() => (
      <Frame {...rest}>
        <Component />
      </Frame>
    )} />
  );
}
import React from "react";
import { Route } from "react-router-dom";

import Frame from "../../pages/Frame/Frame";

export default function PageRoute(props) {
  let {
    path,
    exact = false,
    component: Component,
    ...rest
  } = props;

  return (
    <Route path={path} exact={exact} render={() => (
      <Frame {...rest}>
        <Component />
      </Frame>
    )} />
  );
}
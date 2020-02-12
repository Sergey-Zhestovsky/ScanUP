import React, { useState } from "react";
import { Route } from "react-router-dom";

import Frame from "../../parts/Frame/Frame";
import MenuContext from "../../../contexts/MenuContext";

export default function PageRoute(props) {
  const [menu, setMenu] = useState(true);

  let {
    path,
    exact = false,
    component: Component,
    ...rest
  } = props;

  return (
    <Route path={path} exact={exact} render={() => (
      <MenuContext.Provider value={{ menu, setMenu }}>
        {
          menu
            ? wrapComponent(<Component />, rest)
            : <Component />
        }
      </MenuContext.Provider>
    )} />
  );

  function wrapComponent(body, props) {
    return (
      <Frame {...props}>
        {body}
      </Frame>
    );
  }
}
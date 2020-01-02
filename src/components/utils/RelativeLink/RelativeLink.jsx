import React from "react";
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";

function RelativeLink(props) {
  let {
    nav = false,
    children,
    history,
    location,
    match,
    to,
    staticContext,
    ...rest
  } = props;

  let CurLink = nav ? NavLink : Link,
    relPath = match.path + to;

  return (
    <CurLink to={relPath} {...rest}>
      {children}
    </CurLink>
  );
}

export default withRouter(RelativeLink);
import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function BackLink(props) {
  let {
    children,
    history,
    location,
    match,
    staticContext,
    ...rest
  } = props,
    path = location.pathname,
    backPath = path.slice(0, path.lastIndexOf("/"));

  return (
    <Link to={backPath} {...rest}>{children}</Link>
  );
}

export default withRouter(BackLink);
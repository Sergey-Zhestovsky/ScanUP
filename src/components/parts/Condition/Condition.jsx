import React from "react";

export default function Condition(props) {
  let {
    mounted = true,
    children
  } = props;

  if (mounted)
    return children;

  return null;
}
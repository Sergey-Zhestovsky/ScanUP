import React from "react";
import Markdown from "markdown-to-jsx";

import styles from "./markdown.module.less";

export default function MarkdownComponent(props) {
  let {
    children
  } = props;

  if (typeof children !== typeof "")
    return null;

  return (
    <Markdown className={styles["markdown"]}>
      {children}
    </Markdown>
  );
}
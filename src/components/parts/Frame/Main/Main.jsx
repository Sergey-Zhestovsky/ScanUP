import React from "react";

import concatClasses from "../../../../modules/concatClasses";
import HEADER_STYLE from "../../../../data/styles/headerStyles";

import styles from "./main.module.less";

const mainStyles = {
  [HEADER_STYLE.TRANSPORT_SYSTEM]: styles["transport-systems"]
};

export default function Main(props) {
  let {
    headerStyle,
    withFooter,
    className,
    children
  } = props;

  let headerStyleClass = mainStyles[headerStyle] ?? styles["with-default-header"],
    withFooterClass = withFooter ? styles["with-footer"] : null;

  return (
    <main className={concatClasses(withFooterClass, headerStyleClass, className)}>
      {children}
    </main>
  );
}
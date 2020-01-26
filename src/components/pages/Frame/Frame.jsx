import React from "react";

import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";

export default function Frame(props) {
  let {
    header = true,
    footer = true,
    headerClass,
    mainBodyClass,
    footerClass
  } = props;

  return (
    <React.Fragment>
      {
        header
          ? <Header style={headerClass} />
          : null
      }
      <main className={mainBodyClass}>
        {props.children}
      </main>
      {
        footer
          ? <Footer style={footerClass} />
          : null
      }
    </React.Fragment>
  );
}
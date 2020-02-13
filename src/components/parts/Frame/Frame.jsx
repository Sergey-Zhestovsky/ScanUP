import React, { Component } from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

class Frame extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    let {
      header = true,
      footer = true,
      headerClass,
      mainBodyClass,
      footerClass
    } = this.props;

    return (
      <React.Fragment>
        {
          header
            ? <Header style={headerClass} />
            : null
        }
        <Main
          headerStyle={headerClass}
          withFooter={footer}
          className={mainBodyClass}>
          {this.props.children}
        </Main>
        {
          footer
            ? <Footer style={footerClass} />
            : null
        }
      </React.Fragment>
    );
  }
}

export default Frame;
import React, { Component } from "react";

import Header from "../../parts/Header/Header";
import Footer from "../../parts/Footer/Footer";

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
        <main className={mainBodyClass}>
          {this.props.children}
        </main>
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
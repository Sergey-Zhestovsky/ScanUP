import React, { Component } from "react";

import Markdown from "../../parts/Markdown/Markdown";
import { HEADER_STYLE } from "../../parts/Frame/Header/Header";
import { pageConnector } from "../../../storage/connections/rootConnector";

export const pageConfig = {
  headerClass: HEADER_STYLE.default
};

class Policy extends Component {
  state = {
    text: null
  }

  componentDidMount() {
    pageConnector.policy()
      .then(answer => this.setState({ text: answer }))
      .catch(console.error);
  }

  render() {
    return (
      <Markdown>
        {this.state.text}
      </Markdown>
    );
  }
}

export default Policy;
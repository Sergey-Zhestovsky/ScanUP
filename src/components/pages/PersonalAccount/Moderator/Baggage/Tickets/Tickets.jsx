import React, { Component } from "react";
import { withRouter } from "react-router";

import MenuContext from "../../../../../../contexts/MenuContext";
import { baggageConnector } from "../../../../../../storage/connections/rootConnector";
import ticketTypes from "../../../../../../data/ticketTypes";

import styles from "./tickets.module.less";

class Tickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baggage: null
    };
  }

  componentDidMount() {
    this.context.setMenu(false);

    let uId = this.props.match.params.uId;

    if (this.context.menu || !uId)
      return;

    baggageConnector.get({ uId })
      .then(answer => this.setState({
        baggage: answer
      }))
      .catch(error => this.setState({
        baggage: false
      }));
  }

  componentWillUnmount() {
    return this.context.setMenu(true);
  }

  render() {
    let type = this.props.match.params.type,
      Component = ticketTypes[type]
        ? ticketTypes[type].component
        : () => "404";

    return (
      <div className={styles["ticket-wrapper"]}>
        <Component baggage={this.state.baggage} />
      </div>
    );
  }
}

Tickets.contextType = MenuContext;

export default withRouter(Tickets);
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { baggageConnector } from "../../../../../../../storage/connections/rootConnector";
import BodySpinner from "../../../../parts/BodySpinner/BodySpinner";
import GridElement from "./GridElement/GridElement";
import BaggageFiller from "./BaggageFiller/BaggageFiller";

import styles from "./baggageGrid.module.less";

class BaggageGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baggages: null,
      serverError: null,
      loading: true,
    };
  }

  componentDidMount() {
    baggageConnector.getAll()
      .then(answer => this.setState({
        baggages: answer,
        loading: false
      }))
      .catch(error => this.setState({
        serverError: error,
        loading: false
      }));
  }

  render() {
    if (this.state.loading)
      return <BodySpinner />;

    if (this.state.serverError)
      return null;

    let relPath = this.props.match.path;

    return (
      <div className={styles["baggage-grid"]}>
        {
          this.state.baggages.length
            ? this.state.baggages.map(el => (
              <Link to={`${relPath}/${el.uId}`} key={el._id} className={styles["link"]}>
                <GridElement baggage={el} />
              </Link>
            ))
            : <BaggageFiller />
        }
      </div>
    );
  }
}

export default withRouter(BaggageGrid);
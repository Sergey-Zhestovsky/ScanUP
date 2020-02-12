import React, { Component } from "react";

import TransportSystemsGrid from "./TransportSystemsGrid/TransportSystemsGrid";
import { HEADER_STYLE } from "../../parts/Header/Header";
import Parallax from "../../utils/Parallax/Parallax";
import { tsConnector } from "../../../storage/connections/rootConnector";
import { ReactComponent as Plane } from "../../../svg/plane.svg";

import styles from "./transportSystems.module.less";

export const pageConfig = {
  headerClass: HEADER_STYLE.TRANSPORT_SYSTEM,
  footer: false
};

class TransportSystems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transportSystems: null,
      loaded: false
    };
    this.titleRef = React.createRef();
  }

  componentDidMount() {
    tsConnector.getStatistics()
      .then(answer => this.setState({
        transportSystems: answer,
        loaded: true
      }))
      .catch(console.error);
    this.forceUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles["title-component"]}>
          <div className={styles["background"]}>
            <div className={styles["background-svg-wrapper"]}>
              <Plane className={styles["background-svg"]} />
            </div>
          </div>
          <div className={styles["title-text"]} ref={this.titleRef}>
            <Parallax target={this.titleRef.current} distance={.5} tempo={2.5}>
              <div className={styles["main-text"]}>Transportation systems</div>
              <div className={styles["text-suffix"]}>supported by ScanUP</div>
            </Parallax>
          </div>
        </div>
        {
          this.state.loaded &&
          <TransportSystemsGrid transportSystems={this.state.transportSystems} />
        }
      </React.Fragment>
    );
  }
}

export default TransportSystems;
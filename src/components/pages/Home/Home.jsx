import React, { Component } from "react";

import GlowingNodes, { Node } from "../../../classes/GlowingNodes";
import { HEADER_STYLE } from "../../parts/Header/Header";
import SearchForm from "./SearchForm/SearchForm";

import styles from "./home.module.less";

export const pageConfig = {
  headerClass: HEADER_STYLE.MAIN_PAGE,
  //mainBodyClass: styles.main,
  footer: false
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.glowingNodes = null;
    this.canvasRef = React.createRef();
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    this.glowingNodes = new GlowingNodes({
      wrapper: this.wrapperRef.current,
      canvas: this.canvasRef.current
    })
    this.glowingNodes.init();
  }

  componentWillUnmount() {
    this.glowingNodes.close();
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.wrapperRef} className={styles["canvas-wrapper"]}>
          <canvas ref={this.canvasRef} className={styles["canvas"]}></canvas>
        </div>
        <div className={styles["search-form-wrapper"]}>
          <SearchForm />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
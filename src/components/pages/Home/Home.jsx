import React, { Component } from "react";

import GlowingNodes from "../../parts/GlowingNodes/GlowingNodes";
import { HEADER_STYLE } from "../../parts/Header/Header";
import SearchForm from "./SearchForm/SearchForm";

import styles from "./home.module.less";

export const pageConfig = {
  headerClass: HEADER_STYLE.MAIN_PAGE,
  footer: false
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.wrapperRef} className={styles["canvas-wrapper"]}>
          <div className={styles["search-form-container"]}>
            <div className={styles["search-form-col"]}>
              <SearchForm />
            </div>
          </div>
          <GlowingNodes wrapperRef={this.wrapperRef} className={styles["canvas"]} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
import React, { PureComponent } from "react";

import ScannerClass from "../../../../../classes/Scanner";
import Spinner from "../../../../utils/Spinner/Spinner";

import styles from "./scanner.module.less";

class Scanner extends PureComponent {
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.state = {
      loadingError: false,
      loaded: false,
    };
    this.scanner = null;
  }

  componentDidMount() {
    this.scanner = this.initScanner();
    this.loadScanner();
  }

  componentDidUpdate() {
    this.resizeHandler();
    this.loadScanner();
  }

  initScanner() {
    let container = this.containerRef.current;

    let scan = new ScannerClass(this.getContainerSize());

    container.appendChild(scan.getDomElement());
    scan.animate();

    return scan;
  }

  loadScanner() {
    if (this.props.href)
      this.scanner.load(
        this.props.href,
        () => this.setState({
          loadingError: true
        }),
        () => this.setState({
          loaded: true
        })
      );
  }

  getContainerSize() {
    let container = this.containerRef.current;

    return {
      containerWidth: this.props.width ? this.props.width : container.clientWidth,
      containerHeight: this.props.height ? this.props.height : container.clientHeight
    };
  }

  resizeHandler() {
    if (!this.scanner)
      return;

    let newSize = this.getContainerSize();
    this.scanner.updateSize(newSize.containerWidth, newSize.containerHeight);
  }

  render() {
    return (
      <div className={styles["scanner"]} ref={this.containerRef}>
        {
          this.state.loadingError &&
          <div className={styles["scanner-hover"]}>
            <div className={styles["scanner-error"]}>Error occurred</div>
          </div>
        }
        {
          !this.state.loaded && !this.state.loadingError &&
          <div className={styles["scanner-hover"]}>
            <div className={styles["scanner-loading"]}>
              <Spinner />
            </div>
          </div>
        }
        {
          this.props.sing &&
          <div className={styles["scanner-sign"]}>{this.props.sing}</div>
        }
      </div>
    );
  }
}

export default Scanner;
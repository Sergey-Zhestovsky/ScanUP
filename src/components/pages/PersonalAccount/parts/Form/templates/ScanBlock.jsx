import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  Form, FORM_STYLES, FormBlock, FormGroup, FormInputField, FormSelectField, FormGroupTitle,
  FormCol, FormSubmit, FormTextField, FormBlockTitle, FormSubGroup, FormScannerDescribe
} from "../Form";
import { BUTTON_STYLE } from "../../../../../utils/Button/Button";
import ButtonBlock from "./ButtonBlock";
import Scanner from "../../Scanner/Scanner";

import styles from "../Form.module.less";

class ScanBlock extends PureComponent {
  state = {
    scannerWidth: null,
    scannerHeight: null
  };
  scannerBlockRef = React.createRef();


  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    return this.getScannerWidth();
  }

  componentWillUnmount() {
    return window.removeEventListener("resize", this.resizeHandler);
  }

  componentDidUpdate() {
    return this.getScannerWidth();
  }

  resizeHandler = () => {
    if (!this.props.width || !this.props.height)
      return this.getScannerWidth();
  }

  getScannerWidth() {
    if (!this.props.scanning && !this.props.scan || !this.scannerBlockRef.current)
      return;

    return this.setState({
      scannerWidth: this.props.width || this.scannerBlockRef.current.clientWidth / 2,
      scannerHeight: this.props.height || this.scannerBlockRef.current.clientHeight
    });
  }

  render() {
    let {
      title,
      manager,
      scan,
      scanSing = "",
      onScanHandler,
      onCancelScanHandler,
      scanning,
      withConclusion = false
    } = this.props,
      scanned = !!scan;

    scan = scanning ? {} : scan;

    return (
      <React.Fragment>
        <FormBlock>
          <FormSubGroup className={FORM_STYLES.COLUMN} forwardedRef={this.scannerBlockRef}>
            <FormCol>
              {
                manager &&
                <FormGroup>
                  <FormGroupTitle>{title}</FormGroupTitle>
                  <FormTextField name="Transport system" value={manager.transportSystem.fullName} />
                  <FormTextField name="Reception" value={manager.transportSystemReception.name} />
                  <FormTextField name="Moderator" value={manager.name} />
                  <FormTextField name="Scanner" value={manager.transportSystemReception.scanner.uId} />
                </FormGroup>
              }
              {
                scan &&
                <FormGroup>
                  {
                    !manager && <FormGroupTitle>{title}</FormGroupTitle>
                  }
                  <FormTextField name="Weight" value={scan.weight} format={{ suffix: " kg.", loading: true }} />
                  {
                    !withConclusion &&
                    <FormTextField name="Summary (state)" value={scan.summary} format={{ suffix: "%", loading: true }} />
                  }
                  <FormScannerDescribe name="More" value={scan.description} />
                  <FormTextField name="Time" value={scan.time} format={{ as: "time", loading: true }} />
                </FormGroup>
              }
              {
                !scanned && onScanHandler && !scanning &&
                <ButtonBlock
                  onClick={onScanHandler}>Scan</ButtonBlock>
              }
            </FormCol>
            {
              scan &&
              <FormCol>
                <Scanner
                  width={this.state.scannerWidth}
                  height={this.state.scannerHeight}
                  href={scan.model}
                  sing={scanSing} />
              </FormCol>
            }
          </FormSubGroup>
          {
            !scanned && onCancelScanHandler && scanning &&
            <ButtonBlock
              style={BUTTON_STYLE.WARNING}
              onClick={onCancelScanHandler}>cancel</ButtonBlock>
          }
          {
            withConclusion &&
            <div className={styles["scaner-block-conclusion"]}>
              <div className={styles["conclusion-summary"]}>{scan.summary}</div>
            </div>
          }
        </FormBlock>
      </React.Fragment>
    );
  }
}

ScanBlock.propTypes = {
  title: PropTypes.string,
  manager: PropTypes.object,
  scan: PropTypes.object,
  scanSing: PropTypes.string,
  onScanHandler: PropTypes.func,
  onCancelScanHandler: PropTypes.func,
  scanning: PropTypes.bool
};

export default ScanBlock;
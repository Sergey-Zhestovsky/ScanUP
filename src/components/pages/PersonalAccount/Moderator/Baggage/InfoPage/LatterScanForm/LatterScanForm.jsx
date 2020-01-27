import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import ScanBlock from "../../../../parts/Form/templates/ScanBlock";
import ButtonBlock from "../../../../parts/Form/templates/ButtonBlock";
import Validator from "../../../../../../../classes/Validator";
import { scannerConnector, baggageConnector } from "../../../../../../../storage/connections/rootConnector";

class ScanForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      latterScan: {
        public: null,
        loading: false,
        loadedSucces: null,
        cancelToken: null
      },
      serverError: null,
      formRequesting: false,
    };
    this.validator = new Validator({
      weight: ["required"],
      model: ["required"],
      summary: ["required"],
      descriptionHesh: ["required"],
      time: ["required"]
    });
  }

  latterScanHandler = () => {
    let scan = scannerConnector.verifyScan({ id: this.props.baggageId }),
      cancelToken = scan.next().value;

    this.setState(state => ({
      latterScan: {
        ...state.latterScan,
        loading: true,
        cancelToken
      }
    }));

    scan.next().value
      .then(answer => this.setState(state => ({
        latterScan: {
          ...state.latterScan,
          public: answer.public,
          loading: false,
          loadedSucces: true,
          cancelToken: null
        },
        form: {
          ...state.form,
          ...answer.source
        }
      })))
      .catch(error => this.setState(state => ({
        latterScan: {
          ...state.latterScan,
          loading: false,
          loadedSucces: false,
          cancelToken: null
        }
      })));
  }

  cancelHandler = () => {
    this.state.latterScan.cancelToken();

    return this.setState(state => ({
      latterScan: {
        ...state.latterScan,
        loading: false,
        cancelToken: null
      }
    }));
  }

  submitHandler = () => {
    if (this.state.formRequesting)
      return;

    let errors = this.validator.validate(this.state.form);

    if (errors === true) {
      this.setState({
        formRequesting: true
      });

      baggageConnector.updateLatterScan({
        id: this.props.baggageId,
        ...this.state.form
      })
        .then(answer => {
          this.props.history.push(`/account/history/${this.props.baggageUId}`);
        })
        .catch(error => this.setState({
          serverError: error,
          formRequesting: false
        }));
    } else {
      return this.setState({
        errors
      });
    }
  }

  render() {
    let moderator = this.props.moderator;

    if (!moderator.loaded)
      return null;

    return (
      <React.Fragment>
        <ScanBlock
          title="Latter scan"
          manager={moderator.details}
          scan={this.state.latterScan.public}
          scanSing={moderator.details.transportSystemReception && moderator.details.transportSystemReception.scanner.uId}

          onScanHandler={this.latterScanHandler}
          onCancelScanHandler={this.cancelHandler}
          scanning={this.state.latterScan.loading} />

        {
          this.state.latterScan.loadedSucces &&
          <ButtonBlock
            onClick={this.submitHandler}
            disabled={this.state.formRequesting}>Submit</ButtonBlock>
        }
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    moderator: {
      details: state.auth.details,
      errors: state.auth.errors.details,
      loaded: state.auth.loaded.details
    }
  }
}

export default connect(mapStateToProps)(withRouter(ScanForm));
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Title, { TitleBackLink } from "../../../parts/Title/Title";
import {
  Form, FORM_STYLES, FormBlock, FormGroup, FormInputField, FormSubGroup,
  FormTextField, FormTitle
} from "../../../parts/Form/Form";
import ScanBlock from "../../../parts/Form/templates/ScanBlock";
import BodySpinner from "../../../parts/BodySpinner/BodySpinner";
import ButtonBlock from "../../../parts/Form/templates/ButtonBlock";
import { scannerConnector, baggageConnector } from "../../../../../../storage/connections/rootConnector";
import Validator from "../../../../../../classes/Validator";

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        passport: ""
      },
      errors: {},
      formerScan: false,
      scanLoaded: false,
      formerScanPublic: null,
      serverError: null,
      requesting: false,

      cancelToken: null
    };
    this.validator = new Validator({
      passport: ["required", ["maxLength", 9]],
      weight: ["required"],
      model: ["required"],
      summary: ["required"],
      descriptionHesh: ["required"],
      time: ["required"]
    });
  }

  changeHandler = (name, value) => {
    if (this.state.form[name] !== undefined)
      return this.setState(state => ({
        form: {
          ...state.form,
          [name]: value
        }
      }))
  }

  formerScanHandler = () => {
    let scan = scannerConnector.scan({
      uId: this.props.moderator.details.transportSystemReception.scanner.uId
    });

    this.setState({
      formerScan: true,
      cancelToken: scan.next().value
    });

    scan.next().value
      .then(answer => {
        this.setState(state => ({
          formerScanPublic: answer.public,
          scanLoaded: true,
          cancelToken: null,
          form: {
            ...state.form,
            ...answer.source
          }
        }))
      })
      .catch(error => {
        this.setState({
          formerScan: false,
          serverError: error,
          cancelToken: null,
        })
      });
  }

  cancelHandler = () => {
    this.state.cancelToken();

    return this.setState({
      cancelToken: null,
      formerScan: false
    });
  }

  submitHandler = () => {
    if (this.state.requesting)
      return;

    let errors = this.validator.validate(this.state.form)

    if (errors === true) {
      this.clearErrors();
      this.setState({
        requesting: true
      });

      baggageConnector.add(this.state.form)
        .then(answer => {
          this.props.history.push(`/account/baggage/${answer.uId}`);
        })
        .catch(error => this.setState({
          serverError: error,
          requesting: false
        }));
    } else {
      return this.setState({
        errors
      });
    }
  }

  clearErrors() {
    return this.setState({
      errors: {},
      serverError: null
    });
  }

  render() {
    let moderator = this.props.moderator,
      details = moderator.details,
      body;

    if (moderator.loaded && !moderator.errors) {
      body = (
        <Form>
          <FormTitle>New Baggage</FormTitle>
          <FormBlock>
            <FormGroup>
              <React.Fragment>
                <FormTextField name="Transport system" value={details.transportSystem.fullName} />
                <FormTextField name="Reception" value={details.transportSystemReception.name} />
                <FormTextField name="Moderator" value={details.name} />
                <FormTextField name="Scanner" value={details.transportSystemReception.scanner.uId} />
              </React.Fragment>
            </FormGroup>
            <FormGroup>
              <FormSubGroup className={FORM_STYLES.FIT}>
                <FormInputField
                  name="passport"
                  type="text"
                  placeholder="AB1234567"
                  validate={(val) => val.length <= 9}
                  onChange={this.changeHandler}
                  error={this.state.errors.passport}
                  warningMessage="No side API detected. Check third-party API settings."
                  value={this.state.form.passport}>Passport No.</FormInputField>
              </FormSubGroup>
            </FormGroup>
          </FormBlock>
          <ScanBlock
            title="Former scan"
            height={450}
            manager={null}
            scan={this.state.formerScanPublic}
            scanSing={details.transportSystemReception && details.transportSystemReception.scanner.uId}
            onScanHandler={this.formerScanHandler}
            onCancelScanHandler={this.cancelHandler}
            scanning={!this.state.scanLoaded && this.state.formerScan} />
          {
            this.state.scanLoaded &&
            <ButtonBlock
              onClick={this.submitHandler}
              disabled={this.state.requesting}>Submit</ButtonBlock>
          }
        </Form>
      );
    } else {
      body = <BodySpinner />;
    }

    return (
      <React.Fragment>
        <Title><TitleBackLink /></Title>
        {body}
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

export default connect(mapStateToProps)(withRouter(AddForm));
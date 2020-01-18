import React, { Component } from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import Form, {
  FORM_STYLES, FormBlock, FormGroup, FormInputField, FormSubmit, FormTextField,
  FormSelectField, FormCheckBox, FormSubGroup
} from "../../../parts/Form/Form";
import { tsTypesConnector } from "../../../../../../storage/connections/rootConnector";
import Validator from "../../../../../../classes/Validator";
import errorHandler from "../../../../../../modules/errorHandler";
import { tsConnector } from "../../../../../../storage/connections/rootConnector";

export default class AddTransportSystemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        fullName: "",
        typeId: "",
        shortName: "",
        selfControl: false,
        login: "",
        password: ""
      },
      errors: {},
      serverError: null,
      ready: false,
      transportSystemTypes: []
    };
  }

  componentDidMount() {
    tsTypesConnector.getAll()
      .then((answer) => {
        this.setState({
          transportSystemTypes: answer,
          ready: true
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  changeHandler = (name, value) => {
    this.setState(({ form }) => ({
      form: {
        ...form,
        [name]: value
      }
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();

    let validationConfig = {
      fullName: ["required", ["maxLength", 100]],
      typeId: ["required"]
    };

    if (this.state.form.typeId) {
      Object.assign(validationConfig, {
        shortName: this.prepareTestsForShortName()
      });
    }

    if (this.state.form.selfControl) {
      Object.assign(validationConfig, {
        login: ["required", ["maxLength", 100]],
        password: ["required", ["maxLength", 100]]
      });
    }

    let validator = new Validator(validationConfig),
      errors = validator.validate(this.state.form);

    if (errors === true) {
      this.clearErrors();

      tsConnector.add(this.state.form)
        .then(
          answer => this.props.onSuccess(answer),
          error => {
            this.setState({
              serverError: error
            });
          }
        );
    } else {
      return this.setState({
        errors: errorHandler(errors, false)
      });
    }
  }

  clearErrors() {
    return this.setState({
      errors: {},
      serverError: null
    });
  }

  getCurrentNamingStandard() {
    let currentTSType = this.state.transportSystemTypes.filter(
      el => el._id === this.state.form.typeId)[0];

    return currentTSType ? currentTSType.namingStandard : {};
  }

  prepareTestsForShortName() {
    let config = this.getCurrentNamingStandard(),
      result = ["required"];

    if (typeof config.length === typeof 1)
      result.push(["length", config.length]);

    if (config.isAlphabet === false)
      result.push(["backTest", /\p{L}/u])

    if (config.isNumber === false)
      result.push(["backTest", /[0-9]/])

    if (config.isSymbol === false)
      result.push(["backTest", /\W|_/])

    return result;
  }

  render() {
    let currentTSType = this.getCurrentNamingStandard();

    return (
      <PopUp closeHandler={this.props.closeHandler}>
        <PopUpTitle closeHandler={this.props.closeHandler} >Add transport system</PopUpTitle>
        <Form onSubmit={this.onSubmit} disabled={!this.state.ready}>
          <FormBlock>
            <FormGroup withNestedGroup>
              <FormSubGroup className={FORM_STYLES.CENTER_FORM}>
                <FormGroup>
                  <FormInputField
                    name="fullName"
                    onChange={this.changeHandler}
                    error={this.state.errors.fullName}
                    value={this.state.form.fullName}>Full Name</FormInputField>
                </FormGroup>
                <FormGroup>
                  <FormSelectField
                    name="typeId"
                    values={this.state.transportSystemTypes.map(el => ({
                      key: el._id,
                      value: el.name
                    }))}
                    error={this.state.errors.typeId}
                    onChange={this.changeHandler}>System type</FormSelectField>
                  <FormSubGroup className={FORM_STYLES.SUB_GROUP}>
                    <FormTextField name="Naming standard" value={currentTSType.standard} />
                    <FormTextField name="Name length" value={currentTSType.length} />
                    <FormTextField name="Allowed alphabet" value={currentTSType.isAlphabet} />
                    <FormTextField name="Allowed numbers" value={currentTSType.isNumber} />
                    <FormTextField name="Allowed symbols" value={currentTSType.isSymbol} />
                  </FormSubGroup>
                  <FormInputField
                    disabled={!this.state.form.typeId}
                    name="shortName"
                    onChange={this.changeHandler}
                    error={this.state.errors.shortName}
                    value={this.state.form.shortName}>Short name</FormInputField>
                </FormGroup>
                <FormGroup>
                  <FormCheckBox
                    name="selfControl"
                    value={this.state.form.selfControl}
                    onChange={this.changeHandler}>Self controled</FormCheckBox>
                  <FormInputField
                    disabled={!this.state.form.selfControl}
                    name="login"
                    onChange={this.changeHandler}
                    error={this.state.errors.login}
                    value={this.state.form.login}>Moderator login</FormInputField>
                  <FormInputField
                    disabled={!this.state.form.selfControl}
                    name="password"
                    onChange={this.changeHandler}
                    error={this.state.errors.password}
                    value={this.state.form.password}>Moderator password</FormInputField>
                </FormGroup>
              </FormSubGroup>
            </FormGroup>
            {
              this.state.serverError &&
              <FormGroup>
                <FormSubGroup className={FORM_STYLES.ERROR_MESSAGE}>
                  {this.state.serverError.name}
                </FormSubGroup>
              </FormGroup>
            }
            <FormGroup>
              <FormSubmit>Add</FormSubmit>
            </FormGroup>
          </FormBlock>
        </Form>
      </PopUp>
    );
  }
}
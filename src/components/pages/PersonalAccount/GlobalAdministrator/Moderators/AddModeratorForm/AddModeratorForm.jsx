import React, { Component } from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import Form, {
  FORM_STYLES, FormBlock, FormGroup, FormInputField, FormSubmit,
  FormSelectField, FormSubGroup
} from "../../../parts/Form/Form";
import Validator from "../../../../../../classes/Validator";
import errorHandler from "../../../../../../modules/errorHandler";
import { tsReceptionConnector, moderatorConnector } from "../../../../../../storage/connections/rootConnector";
import TransportSystemsController from "../../../../../../classes/TransportSystems";

export default class AddTransportSystemForm extends Component {
  constructor(props) {
    super(props);

    this.transportSystems = new TransportSystemsController();
    this.formValidator = new Validator({
      email: ["required", ["maxLength", 100]],
      password: ["required", ["maxLength", 100]],
      transportSystemReceptionId: ["required"]
    });

    this.state = {
      form: {
        email: "",
        password: "",
        transportSystemId: "",
        transportSystemReceptionId: ""
      },
      errors: {},
      serverError: null,
      ready: false,
      transportSystems: this.transportSystems.Get(),
      transportSystemReceptions: {
        tsId: "",
        receptions: null
      }
    };
  }

  async componentDidMount() {
    return this.setState(({
      transportSystems: await this.transportSystems.syncronize(),
      ready: true
    }));
  }

  componentDidUpdate() {
    let tsId = this.state.form.transportSystemId,
      receptions = this.state.transportSystemReceptions;

    if (tsId !== receptions.tsId)
      return this.syncronizeReceptions(tsId);
  }

  async syncronizeReceptions(tsId) {
    this.setState({
      transportSystemReceptions: {
        tsId,
        receptions: null
      }
    });

    if (tsId) {
      tsReceptionConnector.getEmpty({ id: tsId })
        .then(
          answer => this.setState({
            transportSystemReceptions: {
              tsId,
              receptions: answer
            }
          }),
          error => this.setState({
            serverError: error
          })
        );
    }
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

    let data = this.state.form,
      errors = this.formValidator.validate(data);

    if (errors === true) {
      this.clearErrors();
      moderatorConnector.add(data)
        .then(
          answer => this.props.onSuccess(answer),
          error => this.setState({
            serverError: error
          })
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

  render() {
    let receptions = this.state.transportSystemReceptions.receptions;

    return (
      <PopUp closeHandler={this.props.closeHandler}>
        <PopUpTitle closeHandler={this.props.closeHandler} >Add moderator</PopUpTitle>
        <Form onSubmit={this.onSubmit} disabled={!this.state.ready}>
          <FormBlock>
            <FormGroup withNestedGroup>
              <FormSubGroup className={FORM_STYLES.CENTER_FORM}>
                <FormGroup>
                  <FormInputField
                    name="email"
                    onChange={this.changeHandler}
                    error={this.state.errors.email}
                    value={this.state.form.email}>Login</FormInputField>
                  <FormInputField
                    name="password"
                    onChange={this.changeHandler}
                    error={this.state.errors.password}
                    value={this.state.form.password}>Password</FormInputField>
                </FormGroup>
                <FormGroup>
                  <FormSelectField
                    name="transportSystemId"
                    values={this.state.transportSystems.map(el => ({
                      key: el._id,
                      value: el.fullName
                    }))}
                    error={this.state.errors.transportSystemId}
                    onChange={this.changeHandler}>Transport systems</FormSelectField>
                  <FormSelectField
                    name="transportSystemReceptionId"
                    values={receptions && receptions.map(el => ({
                      key: el._id,
                      value: el.name
                    }))}
                    error={this.state.errors.transportSystemReceptionId}
                    onChange={this.changeHandler}
                    disabled={!receptions}>Receptions</FormSelectField>
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
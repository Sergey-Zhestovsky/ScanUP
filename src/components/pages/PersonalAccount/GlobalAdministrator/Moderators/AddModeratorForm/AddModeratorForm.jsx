import React, { Component } from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import Form, {
  FORM_STYLES, FormBlock, FormGroup, FormInputField, FormSubmit,
  FormSelectField, FormSubGroup
} from "../../../parts/Form/Form";
import Validator, { Rules } from "../../../../../../classes/Validator";
import { tsReceptionConnector, moderatorConnector } from "../../../../../../storage/connections/rootConnector";
import TransportSystemsController from "../../../../../../classes/TransportSystems";

export default class AddTransportSystemForm extends Component {
  constructor(props) {
    super(props);

    this.transportSystems = new TransportSystemsController();
    this.formValidator = new Validator({
      name: [Rules.required, [Rules.maxLength, 100]],
      email: [Rules.required, [Rules.maxLength, 100]],
      password: [Rules.required, [Rules.maxLength, 100]],
      transportSystemReceptionId: Rules.required
    });

    this.state = {
      form: {
        name: "",
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
      },
      isActive: true
    };
  }

  async componentDidMount() {
    return this.setState(({
      transportSystems: await this.transportSystems.synchronize(),
      ready: true
    }));
  }

  componentDidUpdate() {
    let tsId = this.state.form.transportSystemId,
      receptions = this.state.transportSystemReceptions;

    if (tsId !== receptions.tsId)
      return this.synchronizeReceptions(tsId);
  }

  async synchronizeReceptions(tsId) {
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
        .then(answer => {
          this.props.onSuccess(answer);
          this.setState({ isActive: false });
        })
        .catch(error => this.setState({
          serverError: error
        }));
    } else {
      return this.setState({
        errors: Validator.showError(errors)
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
      <PopUp closeHandler={this.props.closeHandler} isActive={this.state.isActive}>
        <PopUpTitle closeHandler={this.props.closeHandler} >Add moderator</PopUpTitle>
        <Form onSubmit={this.onSubmit} disabled={!this.state.ready}>
          <FormBlock>
            <FormGroup withNestedGroup>
              <FormSubGroup className={FORM_STYLES.CENTER_FORM}>
                <FormGroup>
                  <FormInputField
                    name="name"
                    onChange={this.changeHandler}
                    error={this.state.errors.name}
                    value={this.state.form.name}>Full name</FormInputField>
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
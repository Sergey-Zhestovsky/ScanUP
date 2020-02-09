import React, { Component } from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import Form, {
  FORM_STYLES, FormBlock, FormGroup, FormInputField, FormSubmit,
  FormSelectField, FormSubGroup
} from "../../../parts/Form/Form";
import Validator, { Rules } from "../../../../../../classes/Validator";
import { tsReceptionConnector } from "../../../../../../storage/connections/rootConnector";

export default class AddTransportSystemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        transportSystemId: ""
      },
      errors: {},
      serverError: null,
      isActive: true
    };
    this.validator = new Validator({
      name: [Rules.required, [Rules.maxLength, 100]],
      transportSystemId: Rules.required
    });
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

    let errors = this.validator.validate(this.state.form);

    if (errors === true) {
      this.clearErrors();
      tsReceptionConnector.add(this.state.form)
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
    return (
      <PopUp closeHandler={this.props.closeHandler} isActive={this.state.isActive}>
        <PopUpTitle closeHandler={this.props.closeHandler} >Add reception</PopUpTitle>
        <Form onSubmit={this.onSubmit}>
          <FormBlock>
            <FormGroup>
              <FormSubGroup className={FORM_STYLES.CENTER_FORM}>
                <FormGroup>
                  <FormInputField
                    name="name"
                    onChange={this.changeHandler}
                    error={this.state.errors.name}
                    value={this.state.form.name}>Name</FormInputField>
                  <FormSelectField
                    name="transportSystemId"
                    values={this.props.transportSystems.map(el => ({
                      key: el._id,
                      value: el.fullName
                    }))}
                    error={this.state.errors.transportSystemId}
                    onChange={this.changeHandler}>System type</FormSelectField>
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
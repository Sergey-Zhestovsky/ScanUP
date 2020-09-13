import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import { Form, FormBlock, FormGroup, FormInputField, FormSubmit } from "../../../parts/Form/Form";
import KeyInput from "../../../../../utils/KeyInput/KeyInput";
import Validator, { Rules } from "../../../../../../classes/Validator";

import styles from "./SearchForm.module.less";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        key: ""
      },
      errors: {}
    };
    this.timeout = 200;
    this.validator = new Validator({
      key: [Rules.required, [Rules.test, /^.{4}-.{4}-.{4}$/]]
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

  submitHandler = () => {
    let data = this.state.form,
      errors = this.validator.validate(data);

    this.clearErrors();

    if (errors === true)
      return this.props.history.push("/account/baggage/" + data.key);
    else
      return this.setState({
        errors
      })
  }

  clearErrors() {
    this.setState({
      errors: {}
    })
  }

  render() {
    return (
      <PopUp closeHandler={this.props.closeHandler} timeout={this.timeout}>
        <PopUpTitle closeHandler={this.props.closeHandler} >Find baggage</PopUpTitle>
        <Form>
          <FormBlock>
            <FormGroup>
              <FormInputField
                className={styles["key-input"]}
                warningMessage="No side API detected. Check third-party API settings."
                render={() =>
                  <KeyInput
                    focus
                    onChange={this.changeHandler.bind(this, "key")}
                    readyTimeout={this.timeout}
                    value={this.state.form.key}
                    error={this.state.errors.key} />}>
                Baggage id
              </FormInputField>
            </FormGroup>
            <FormGroup>
              <FormSubmit onClick={this.submitHandler}>Find</FormSubmit>
            </FormGroup>
          </FormBlock>
        </Form>
      </PopUp>
    );
  }
}

export default withRouter(SearchForm);
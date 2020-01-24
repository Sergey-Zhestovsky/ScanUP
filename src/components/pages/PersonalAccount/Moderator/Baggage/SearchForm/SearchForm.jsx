import React, { Component } from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import { Form, FormBlock, FormGroup, FormInputField, FormSubmit } from "../../../parts/Form/Form";
import KeyInput from "../../../../../utils/KeyInput/KeyInput";

import styles from "./SearchForm.module.less";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        key: ""
      }
    };
    this.timeout = 200;
  }

  changeHandler = (name, value) => {
    this.setState(({ form }) => ({
      form: {
        ...form,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <PopUp closeHandler={this.props.closeHandler} timeout={this.timeout} isActive={this.props.isActive}>
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
                    value={this.state.form.key} />}>
                Baggage id
              </FormInputField>
            </FormGroup>
            <FormGroup>
              <FormSubmit>Find</FormSubmit>
            </FormGroup>
          </FormBlock>
        </Form>
      </PopUp>
    );
  }
}
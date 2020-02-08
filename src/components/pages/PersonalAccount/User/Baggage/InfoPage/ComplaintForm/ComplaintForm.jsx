import React, { Component } from "react";

import PopUp, { PopUpTitle } from "../../../../../../utils/PopUp/PopUp";
import Form, {
  FORM_STYLES, FormBlock, FormGroup, FormInputField,
  FormSubmit, FormSubGroup, FormTextarea
} from "../../../../parts/Form/Form";
import Validator, { Rules } from "../../../../../../../classes/Validator";
import { complaintConnector } from "../../../../../../../storage/connections/rootConnector";

import styles from "./complaintForm.module.less";

export default class ComplaintForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: null,
        message: ""
      },
      errors: {},
      serverError: null,
      isActive: true
    };

    this.formValidator = new Validator({
      title: [[Rules.maxLength, 50]],
      message: [Rules.required, [Rules.maxLength, 300]]
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

    let data = this.state.form,
      errors = this.formValidator.validate(data);

    if (errors === true) {
      this.clearErrors();

      complaintConnector.add({ scanId: this.props.scanId, ...data })
        .then(answer => this.setState({ isActive: false }))
        .catch(error => this.setState({ serverError: error }));
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
        <PopUpTitle closeHandler={this.props.closeHandler} >Leave a complaint</PopUpTitle>
        <Form onSubmit={this.onSubmit}>
          <FormBlock>
            <FormGroup withNestedGroup className={styles["form"]}>
              <FormSubGroup className={FORM_STYLES.CENTER_FORM}>
                <FormGroup>
                  <FormInputField
                    name="title"
                    onChange={this.changeHandler}
                    error={this.state.errors.title}
                    value={this.state.form.title}
                    inputClassName={styles["title-input"]}>Title</FormInputField>

                  <FormTextarea
                    name="message"
                    onChange={this.changeHandler}
                    error={this.state.errors.message}
                    value={this.state.form.message}
                    maxLength={300}
                    className={styles["message-block"]}
                    inputClassName={styles["message-input"]}>Message</FormTextarea>
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
              <FormSubmit>Send</FormSubmit>
            </FormGroup>
          </FormBlock>
        </Form>
      </PopUp>
    );
  }
}
import React, { Component } from "react";
import { withRouter } from "react-router";

import KeyInput from "../../../utils/KeyInput/KeyInput";
import Button from "../../../utils/Button/Button";
import { baggageConnector } from "../../../../storage/connections/rootConnector";
import Validator, { Rules } from "../../../../classes/Validator";

import styles from "./searchForm.module.less";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        key: ""
      },
      errors: {
        key: null
      },
      requesting: false,
      serverError: null
    };
    this.validator = new Validator({
      key: [Rules.required, [Rules.test, /^.{4}-.{4}-.{4}$/]]
    });
  }

  changeHandler = (name, value) => {
    this.setState(state => {
      let form = {
        ...state.form,
        [name]: value
      },
        errors = this.validator.validate(form);

      return { form, errors }
    });
  }

  submitHandler = () => {
    this.clearErrors();
    this.setState({ requesting: true });

    baggageConnector.get({ uId: this.state.form.key })
      .then(answer => {
        if (answer !== null) {
          return this.props.history.push("/baggage", { baggage: answer });
        }
      })
      .catch(error => this.setState({
        requesting: false,
        serverError: error
      }));
  }

  clearErrors() {
    this.setState({
      errors: {},
      serverError: null
    });
  }

  render() {
    let submitDisabled = this.state.requesting || this.state.errors.key !== undefined;

    return (
      <div className={styles["form"]}>
        <div className={styles["form-title"]}>
          Find you
          <span className={styles["title-accent-word"]}> baggage</span>
        </div>
        <div className={styles["form-input"]}>
          <KeyInput
            inputClassName={styles["input"]}
            onChange={this.changeHandler.bind(this, "key")}
            value={this.state.form.key} />
        </div>
        <div className={styles["form-button-field"]}>
          <Button
            disabled={submitDisabled}
            disabledClassName={styles["disabled"]}
            className={styles["button"]}
            onClick={this.submitHandler}>find</Button>
        </div>
        {
          this.state.serverError &&
          <div className={styles["error-field"]}>
            <div className={styles["error-text"]}>
              {this.state.serverError.name || "Unknown error occurred"}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(SearchForm);
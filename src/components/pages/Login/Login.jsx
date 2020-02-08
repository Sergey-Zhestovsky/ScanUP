import React, { Component } from "react";
import { connect } from "react-redux";

import AuthForm, { AuthField, AuthTitle, AuthError, AuthSubmit } from "../../parts/Authorization/Authorization";
import Validator, { Rules } from "../../../classes/Validator";
import { authActions } from "../../../storage/actions";
import withAuthentication from "../../../hoc/withAuthentication";

export const pageConfig = {
  footer: false
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: "",
        password: ""
      },
      errors: {
        email: null,
        password: null
      },
      serverError: null
    };

    this.validator = new Validator({
      email: [Rules.required, [Rules.maxLength, 100]],
      password: [Rules.required, [Rules.maxLength, 100]]
    });
  }

  changeHandler = (name, value) => {
    return this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  submitHandler = (e) => {
    e.preventDefault();

    let errors = this.validator.validate(this.state.form);

    if (errors === true) {
      this.clearErrors();
      this.props.login(this.state.form)
        .catch(serverError => this.setState({ serverError }));
    } else {
      this.setState({
        ...this.state,
        errors: Validator.showError(errors)
      });
    }
  }

  clearErrors() {
    this.setState({
      errors: {
        email: null,
        password: null
      },
      serverError: null
    });
  }

  render() {
    let responseError = this.state.serverError && this.state.serverError.Message;

    return (
      <AuthForm withWrapper withErrorHighlight={responseError} onSubmit={this.submitHandler}>
        <AuthTitle>Login</AuthTitle>
        <AuthField
          name="email"
          type="text"
          placeholder="example@email.com"
          error={this.state.errors.email}
          value={this.state.form.email}
          onChange={this.changeHandler}
        >Email</AuthField>
        <AuthField
          name="password"
          type="password"
          placeholder="✱✱✱✱✱✱"
          error={this.state.errors.password}
          value={this.state.form.password}
          onChange={this.changeHandler}
        >Password</AuthField>
        <AuthSubmit disabled={this.props.auth.loaded === false}>Login</AuthSubmit>
        <AuthError>{responseError}</AuthError>
      </AuthForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: {
      loaded: state.auth.loaded.login
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => dispatch(authActions.login(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withAuthentication(Login, { authorized: false })
);
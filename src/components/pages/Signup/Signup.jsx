import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import AuthForm, { AuthField, AuthTitle, AuthError, AuthSubmit } from "../../parts/Authorization/Authorization";
import Validator, { Rules } from "../../../classes/Validator";
import { authActions } from "../../../storage/actions";
import withAuthentication from "../../../hoc/withAuthentication";

export const pageConfig = {
  footer: false
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        email: "",
        password: "",
        rePassword: ""
      },
      errors: {
        name: null,
        email: null,
        password: null,
        rePassword: null
      },
      serverError: null
    };

    this.passport = this.props.location.state
      ? this.props.location.state.passport
      : null;
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
    this.clearErrors();

    let validator = new Validator({
      name: [Rules.required, [Rules.maxLength, 100]],
      email: [Rules.required, Rules.email, [Rules.maxLength, 100]],
      password: [Rules.required, [Rules.maxLength, 100], [Rules.password, this.state.form.rePassword]],
      rePassword: [Rules.required, [Rules.maxLength, 100]]
    });

    let data = this.state.form,
      errors = validator.validate(data);

    if (errors === true) {
      this.clearErrors();
      this.props.signUp({ passport: this.passport, ...data })
        .catch(serverError => this.setState({ serverError }));
      //return this.props.signUp({ passport: this.passport, ...data });
    } else {
      return this.setState({
        ...this.state,
        errors: Validator.showError(errors)
      });
    }
  }

  clearErrors() {
    this.setState({
      errors: {
        name: null,
        email: null,
        password: null,
        rePassword: null
      },
      serverError: null
    });
  }

  render() {
    if (!this.passport)
      return <Redirect to="/" />

    let responseError = this.state.serverError && this.state.serverError.Message;

    return (
      <AuthForm withWrapper withErrorHighlight={responseError} onSubmit={this.submitHandler}>
        <AuthTitle>Registration</AuthTitle>
        <AuthField
          name="name"
          type="text"
          placeholder="John Doe"
          error={this.state.errors.name}
          value={this.state.form.name}
          onChange={this.changeHandler}
        >Full name</AuthField>
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
        <AuthField
          name="rePassword"
          type="password"
          placeholder="✱✱✱✱✱✱"
          error={this.state.errors.rePassword}
          value={this.state.form.rePassword}
          onChange={this.changeHandler}
        >Repeat password</AuthField>
        <AuthSubmit disabled={this.props.auth.loaded === false}>Sign up</AuthSubmit>
        <AuthError>{responseError}</AuthError>
      </AuthForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: {
      loaded: state.auth.loaded.signup
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (user) => dispatch(authActions.signUp(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withAuthentication(Signup, { authorized: false })
  )
);
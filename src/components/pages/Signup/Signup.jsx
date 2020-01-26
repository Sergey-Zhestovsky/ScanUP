import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import AuthForm, { AuthField, AuthTitle, AuthSubmit } from "../../parts/Authorization/Authorization";
import Validator from "../../../classes/Validator";
import errorHandler from "../../../modules/errorHandler";
import { signUp } from "../../../storage/actions/authActions";
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
      }
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
      name: ["required", ["maxLength", 100]],
      email: ["required", "email", ["maxLength", 100]],
      password: ["required", ["maxLength", 100], ["password", this.state.form.rePassword]],
      rePassword: ["required", ["maxLength", 100]]
    });

    let data = this.state.form,
      errors = validator.validate(data);

    if (errors === true) {
      return this.props.signUp({ passport: this.passport, ...data });
    } else {
      return this.setState({
        ...this.state,
        errors: errorHandler(errors)
      });
    }
  }

  clearErrors() {
    this.setState(state => ({
      errors: {
        ...state.errors,
        name: null,
        email: null,
        password: null,
        rePassword: null
      }
    }));
  }

  render() {
    if (!this.passport)
      return <Redirect to="/" />

    return (
      <AuthForm withWrapper onSubmit={this.submitHandler}>
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
        <AuthSubmit>Sign up</AuthSubmit>
      </AuthForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (user) => dispatch(signUp(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withAuthentication(Signup, { authorized: false })
  )
);
import React, { Component } from "react";
import { connect } from "react-redux";

import AuthForm, { AuthField, AuthTitle, AuthSubmit } from "../../parts/Authorization/Authorization";
import Validator from "../../../classes/Validator";
import errorHandler from "../../../modules/errorHandler";
import { login } from "../../../storage/actions/authActions";
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
      }
    };

    this.validator = new Validator({
      email: ["required"],
      password: ["required"]
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
      return this.props.login(this.state.form);
    } else {
      return this.setState({
        ...this.state,
        errors: errorHandler(errors)
      });
    }
  }

  render() {
    return (
      <AuthForm withWrapper onSubmit={this.submitHandler}>
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
        <AuthSubmit>Login</AuthSubmit>
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
    login: (user) => dispatch(login(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withAuthentication(Login, { authorized: false })
);
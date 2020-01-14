import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function withAuthorization(WrappedComponent, { authorized = true, redirect = "/", privilege } = {}) {
  class WithAuthorization extends Component {
    render() {
      let enter = false,
        {
          authState,
          user,
          ...rest
        } = this.props;

      enter = authState === authorized;

      if (privilege)
        enter = user.privilege === privilege.token;

      if (enter)
        return <WrappedComponent {...rest} />;

      return <Redirect to={redirect} />;
    }
  }

  return connect(mapStateToProps)(WithAuthorization);
}

function mapStateToProps(state) {
  return {
    authState: state.auth.isAuthorized,
    user: state.auth.user
  }
}

export default withAuthorization;
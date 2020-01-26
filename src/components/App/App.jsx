import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home, { pageConfig as homePageConfig } from "../pages/Home/Home";
import Login, { pageConfig as loginPageConfig } from "../pages/Login/Login";
import Signup, { pageConfig as SignupPageConfig } from "../pages/Signup/Signup";
import PersonalAccount, { pageConfig as accountPageConfig } from "../pages/PersonalAccount/PersonalAccount";
import BaggagePreview, { pageConfig as baggagePageConfig } from "../pages/BaggagePreview/BaggagePreview";

import PageRoute from "../utils/PageRoute/PageRoute";
import { getUserDetail } from "../../storage/actions/authActions";

import styles from './App.module.less';

class App extends Component {
  componentDidMount() {
    this.props.getUserDetail();
  }

  render() {
    return (
      <div className={styles.App}>
        <BrowserRouter>
          <Switch>
            <PageRoute path="/" exact component={Home} {...homePageConfig} />
            <PageRoute path="/login" component={Login} {...loginPageConfig} />
            <PageRoute path="/signup" component={Signup} {...SignupPageConfig} />
            <PageRoute path="/account" component={PersonalAccount} {...accountPageConfig} />
            <PageRoute path="/baggage" exact component={BaggagePreview} {...baggagePageConfig} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDetail: () => dispatch(getUserDetail())
  }
}

export default connect(null, mapDispatchToProps)(App);

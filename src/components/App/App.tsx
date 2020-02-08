import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import Home, { pageConfig as homePageConfig } from "../pages/Home/Home";
import Login, { pageConfig as loginPageConfig } from "../pages/Login/Login";
import Signup, { pageConfig as SignupPageConfig } from "../pages/Signup/Signup";
import PersonalAccount, { pageConfig as accountPageConfig } from "../pages/PersonalAccount/PersonalAccount";
import BaggagePreview, { pageConfig as baggagePageConfig } from "../pages/BaggagePreview/BaggagePreview";
import PageRoute from "../utils/PageRoute/PageRoute";
import { authActions } from "../../storage/actions";
import { ThunkDispatch } from "../../storage/types/redux-actions";
import Transition from "../utils/Transition/Transition";

import styles from './App.module.less';

class App extends Component<AppProps> {

  public state = {
    mounted: false
  };

  constructor(props: AppProps) {
    super(props);
    this.props.getUserDetail();
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    return (
      <Transition in={true} style={styles} unmountOnExit appear>
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
      </Transition>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch) {
  return {
    getUserDetail: () => dispatch(authActions.getUserDetail())
  }
}

let connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type AppProps = PropsFromRedux;

export default connector(App);

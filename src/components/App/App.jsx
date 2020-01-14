import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home, { pageConfig as homePageConfig } from "../pages/Home/Home";
import Login, { pageConfig as loginPageConfig } from "../pages/Login/Login";
import PersonalAccount, { pageConfig as accountPageConfig } from "../pages/PersonalAccount/PersonalAccount";
import PageRoute from "../utils/PageRoute/PageRoute";

import styles from './App.module.less';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <PageRoute path="/" exact component={Home} {...homePageConfig} />
          <PageRoute path="/login" component={Login} {...loginPageConfig} />
          <PageRoute path="/account" component={PersonalAccount} {...accountPageConfig} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

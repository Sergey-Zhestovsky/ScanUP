import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import PersonalAccount, { pageConfig } from "../pages/PersonalAccount/PersonalAccount";
import PageRoute from "../utils/PageRoute/PageRoute";

import styles from './App.module.less';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => (
            <Redirect to="/account" />
          )} />
          <PageRoute to="/account" component={PersonalAccount} {...pageConfig} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

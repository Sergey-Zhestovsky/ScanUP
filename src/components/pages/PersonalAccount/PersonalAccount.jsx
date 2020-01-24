import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import Menu from "./parts/Menu/Menu";
import { HEADER_STYLE } from "../../parts/Header/Header";
import withAuthentication from "../../../hoc/withAuthentication";
import getPrivilege from "../../../modules/getPrivilege";
import accounts from "../../../data/accounts";

import styles from "./personalAccount.module.less";

export const pageConfig = {
  headerClass: HEADER_STYLE.account,
  mainBodyClass: styles.main,
  footer: false
};

function PersonalAccount(props) {
  let currentPrivilege = getPrivilege(props.privilege),
    match = props.match;

  if (currentPrivilege === null)
    return <Redirect to="/" />

  let account = accounts[currentPrivilege.index];

  if (match.isExact)
    return <Redirect to={match.path + account.menu[0].link} />

  let routes = account.menu.map((el, i) => <Route key={i}
    path={`${match.path}${el.link}`} component={el.Component} />);

  return (
    <React.Fragment>
      <Menu list={account.menu} />
      <div className={styles["main-wrapper"]}>
        <Switch>
          {routes}
        </Switch>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    privilege: state.auth.user && state.auth.user.privilege || null
  }
}

export default connect(mapStateToProps)
  (withAuthentication(withRouter(PersonalAccount), { redirect: "/login" }));
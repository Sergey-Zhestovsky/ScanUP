import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import Menu from "./parts/Menu/Menu";
import { HEADER_STYLE } from "../../parts/Header/Header";
import withAuthentication from "../../../hoc/withAuthentication";
import getPrivilege from "../../../modules/getPrivilege";
import accounts from "../../../data/accounts";

import styles from "./PersonalAccount.module.less";

export const pageConfig = {
  headerClass: HEADER_STYLE.account,
  mainBodyClass: styles.main,
  footer: false
};

function PersonalAccount(props) {
  let relPath = props.match.path,
    account = accounts[getPrivilege(props.privilege).index],
    routes = generateRoutes(account.menu, relPath);

  function generateRoutes(list, relPath) {
    let res = [];

    for (let key in list) {
      let el = list[key];

      res.push(<Route key={res.length}
        path={`${relPath}${el.link}`} component={el.Component} />)
    }

    return res;
  }

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
  (withAuthentication(withRouter(PersonalAccount)));
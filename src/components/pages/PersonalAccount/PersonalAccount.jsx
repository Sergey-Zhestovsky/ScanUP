import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import Menu from "./parts/Menu/Menu";
import { HEADER_STYLE } from "../../parts/Header/Header";
import withAuthentication from "../../../hoc/withAuthentication";

import styles from "./PersonalAccount.module.less";

/**
 * TODO
 */
import privileges from "../../../data/privileges";
import accounts from "../../../data/accounts";
const privilege = privileges.MODERATOR;
const account = accounts[privilege];

export const pageConfig = {
  headerClass: HEADER_STYLE.account,
  mainBodyClass: styles.main,
  footer: false
};

function PersonalAccount(props) {
  let relPath = props.match.path,
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

export default withAuthentication(withRouter(PersonalAccount));
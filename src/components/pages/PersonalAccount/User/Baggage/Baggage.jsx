import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import MainList from "./MainList/MainList";
import InfoPage from "./InfoPage/InfoPage";


class Baggage extends Component {
  render() {
    let relPath = this.props.match.path;

    return (
      <Switch>
        <Route path={`${relPath}`} exact component={MainList} />
        <Route path={`${relPath}/:uId`} component={InfoPage} />
      </Switch>
    );
  }
}

export default withRouter(Baggage);
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import DataTable from "./DataTable/DataTable";
import InfoPage from "../Baggage/InfoPage/InfoPage";

class History extends Component {
  render() {
    let relPath = this.props.match.path;

    return (
      <Switch>
        <Route path={`${relPath}`} exact component={DataTable} />
        <Route path={`${relPath}/:uId`} component={InfoPage} />
      </Switch>
    );
  }
}

export default withRouter(History);
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import DataTable from "./BaggageDataTable/BaggageDataTable";
import AddForm from "./AddForm/AddForm";
import InfoPage from "./InfoPage/InfoPage";

class Baggage extends Component { // /exact /add /1234-1234-1234
  render() {
    let relPath = this.props.match.path;

    return (
      <Switch>
        <Route path={`${relPath}`} exact component={DataTable} />
        <Route path={`${relPath}/add`} component={AddForm} />
        <Route path={`${relPath}/tikets`} render={() => 123} />
        <Route path={`${relPath}/:uId`} component={InfoPage} />
      </Switch>
    );
  }
}

export default withRouter(Baggage);
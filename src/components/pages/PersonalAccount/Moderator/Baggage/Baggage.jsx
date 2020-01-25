import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import DataTable from "./BaggageDataTable/BaggageDataTable";
import AddForm from "./AddForm/AddForm";
import InfoPage from "./InfoPage/InfoPage";
import Tickets from "./Tickets/Tickets";

class Baggage extends Component {
  render() {
    let relPath = this.props.match.path;

    return (
      <Switch>
        <Route path={`${relPath}`} exact component={DataTable} />
        <Route path={`${relPath}/add`} component={AddForm} />
        <Route path={`${relPath}/tickets/:type/:uId`} component={Tickets} />
        <Route path={`${relPath}/:uId`} component={InfoPage} />
      </Switch>
    );
  }
}

export default withRouter(Baggage);
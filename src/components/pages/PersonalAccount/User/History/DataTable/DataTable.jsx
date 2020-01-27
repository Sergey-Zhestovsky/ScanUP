import React, { Component } from "react";

import Toolbar from "./Toolbar/Toolbar";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import DataTableRow from "./DataTableRow/DataTableRow";
import DataTable from "../../../parts/DataTable/DataTable";
import Title, { titleStyle } from "../../../parts/Title/Title";
import { baggageConnector } from "../../../../../../storage/connections/rootConnector";

class BaggageDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baggages: []
    };
  }

  componentDidMount() {
    baggageConnector.getHistory()
      .then(answer => this.setState({
        baggages: answer
      }))
      .catch(console.error);
  }

  render() {
    let createTableBody = (tsArray) => {
      return tsArray.map((mod, i) => {
        return <DataTableRow key={mod._id} index={i + 1} object={mod} />
      });
    };

    return (
      <div>
        <Title style={titleStyle.CAPITAL}>Baggage</Title>
        <Toolbar />
        <DataTable
          header={<DataTableHeader />}
          body={createTableBody(this.state.baggages)} />
      </div>
    );
  }
}

export default BaggageDataTable;
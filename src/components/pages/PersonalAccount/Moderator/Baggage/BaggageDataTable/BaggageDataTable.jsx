import React, { Component } from "react";

import BaggageToolbar from "./BaggageToolbar";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import DataTableRow from "./DataTableRow/DataTableRow";
import DataTable from "../../../parts/DataTable/DataTable";
import SearchForm from "../SearchForm/SearchForm";
import Title, { titleStyle } from "../../../parts/Title/Title";
import { baggageConnector } from "../../../../../../storage/connections/rootConnector";

class BaggageDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baggages: [],
      searchBar: false
    };
  }

  componentDidMount() {
    baggageConnector.getAll()
      .then(answer => this.setState({
        baggages: answer
      }))
      .catch(console.error);
  }

  openSearchBar = (event) => {
    console.log(this.state.searchBar)
    this.setState({
      searchBar: true
    });
  }

  closeSearchBar = (event) => {
    console.log(this.state.searchBar)
    this.setState({
      searchBar: false
    });
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
        <BaggageToolbar openSearchBar={this.openSearchBar} />
        <DataTable
          header={<DataTableHeader />}
          body={createTableBody(this.state.baggages)} />

        <SearchForm
          isActive={this.state.searchBar}
          closeHandler={this.closeSearchBar} />

      </div>
    );
  }
}

export default BaggageDataTable;
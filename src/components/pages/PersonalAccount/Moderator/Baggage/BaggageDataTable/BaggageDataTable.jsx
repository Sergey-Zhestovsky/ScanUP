import React, { Component } from "react";

import BaggageToolbar from "./BaggageToolbar";
import DataTable from "../../../parts/DataTable/DataTable";
import SearchForm from "../SearchForm/SearchForm";
import Title, { titleStyle } from "../../../parts/Title/Title";

class BaggageDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBar: false
    };
  }

  openSearchBar = (event) => {
    this.setState({
      searchBar: true
    });
  }

  closeSearchBar = (event) => {
    this.setState({
      searchBar: false
    });
  }

  render() {
    return (
      <div>
        <Title style={titleStyle.CAPITAL}>Baggage</Title>
        <BaggageToolbar openSearchBar={this.openSearchBar} />
        <DataTable />
        {
          this.state.searchBar &&
          <SearchForm closeHandler={this.closeSearchBar} />
        }
      </div>
    );
  }
}

export default BaggageDataTable;
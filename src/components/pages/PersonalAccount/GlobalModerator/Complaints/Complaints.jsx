import React, { Component } from "react";

import DataTable from "../../parts/DataTable/DataTable";
import Title, { titleStyle } from "../../parts/Title/Title";
import Toolbar from "./Toolbar/Toolbar";
import DataTableRow from "./DataTableRow/DataTableRow";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import ViewForm from "./ViewForm/ViewForm";
import { complaintConnector } from "../../../../../storage/connections/rootConnector";

class Complaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complaintForm: false,
      complaints: []
    }
  }

  componentDidMount() {
    complaintConnector.getAll()
      .then(answer => this.setState({
        complaints: answer
      }))
      .catch(console.error)
  }

  openViewHandler = (index) => {
    this.setState({
      complaintForm: this.state.complaints[index]
    });
  }

  closeHandler = () => {
    this.setState({
      complaintForm: false
    });
  }

  render() {
    let createTableBody = (tsArray) => {
      return tsArray.map((el, i) =>
        <DataTableRow
          key={el._id}
          index={i + 1}
          object={el}
          viewHandler={this.openViewHandler.bind(null, i)} />
      );
    };
    console.log(this.state.complaints)
    return (
      <div>
        <Title style={titleStyle.CAPITAL}>Complaints</Title>
        <Toolbar clickHandler={this.openFormHandler} />
        <DataTable
          header={<DataTableHeader />}
          body={createTableBody(this.state.complaints)} />

        <ViewForm
          isActive={!!this.state.complaintForm}
          complaint={this.state.complaintForm}
          closeHandler={this.closeHandler.bind(null, "complaintForm")} />
      </div>
    );
  }
}

export default Complaints;
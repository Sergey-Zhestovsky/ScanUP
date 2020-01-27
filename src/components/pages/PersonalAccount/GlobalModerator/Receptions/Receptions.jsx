import React, { Component } from "react";

import DataTable from "../../parts/DataTable/DataTable";
import Title, { titleStyle } from "../../parts/Title/Title";
import Toolbar from "./Toolbar/Toolbar";
import DataTableRow from "./DataTableRow/DataTableRow";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import AddReceptionForm from "./AddReceptionForm/AddReceptionForm";
import If from "../../../../parts/Condition/Condition";
import { tsReceptionConnector } from "../../../../../storage/connections/rootConnector";

class Moderators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addReceptionForm: false,
      receptions: []
    }
  }

  componentDidMount() {
    tsReceptionConnector.getAll()
      .then(
        answer => this.setState({
          receptions: answer
        }),
        error => console.error(error)
      )
  }

  openFormHandler = (formName) => {
    if (this.state[formName] !== undefined)
      return this.setState({
        [formName]: true
      });
  }

  closeHandler = (formName) => {
    if (this.state[formName] !== undefined)
      return this.setState({
        [formName]: false
      });
  }

  addReceptionSuccess = (reception) => {
    return this.setState(state => ({
      receptions: [...state.receptions, reception]
    }));
  }

  render() {
    let createTableBody = (tsArray) => {
      return tsArray.map((mod, i) => {
        return <DataTableRow key={mod._id} index={i + 1} object={mod} />
      });
    };

    return (
      <div>
        <Title style={titleStyle.CAPITAL}>Receptions</Title>
        <Toolbar clickHandler={this.openFormHandler} />
        <DataTable
          header={<DataTableHeader />}
          body={createTableBody(this.state.receptions)} />

        <If mounted={this.state.addReceptionForm}>
          <AddReceptionForm
            closeHandler={this.closeHandler.bind(null, "addReceptionForm")}
            onSuccess={this.addReceptionSuccess} />
        </If>
      </div>
    );
  }
}

export default Moderators;
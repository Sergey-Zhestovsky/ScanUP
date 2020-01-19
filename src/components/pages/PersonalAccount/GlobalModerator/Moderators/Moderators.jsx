import React, { Component } from "react";

import DataTable from "../../parts/DataTable/DataTable";
import Title, { titleStyle } from "../../parts/Title/Title";
import Toolbar from "./Toolbar/Toolbar";
import DataTableRow from "./DataTableRow/DataTableRow";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import AddModeratorForm from "./AddModeratorForm/AddModeratorForm";
import { moderatorConnector } from "../../../../../storage/connections/rootConnector";

class Moderators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addModeratorForm: false,
      moderators: []
    }
  }

  async componentDidMount() {
    moderatorConnector.getAll()
      .then(
        answer => this.setState({
          moderators: answer
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

  addModeratorSuccess = (moderator) => {
    return this.setState(state => ({
      addModeratorForm: false,
      moderators: [...state.moderators, moderator]
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
        <Title style={titleStyle.CAPITAL}>Moderators</Title>
        <Toolbar clickHandler={this.openFormHandler} />
        <DataTable
          header={<DataTableHeader />}
          body={createTableBody(this.state.moderators)} />

        {
          this.state.addModeratorForm &&
          <AddModeratorForm
            closeHandler={this.closeHandler.bind(null, "addModeratorForm")}
            onSuccess={this.addModeratorSuccess} />
        }

      </div>
    );
  }
}

export default Moderators;
import React, { Component } from "react";

import DataTable from "../../parts/DataTable/DataTable";
import Title, { titleStyle } from "../../parts/Title/Title";
import Toolbar from "./Toolbar/Toolbar";
import DataTableRow from "./DataTableRow/DataTableRow";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import AddTransportSystemForm from "./AddTransportSystemForm/AddTransportSystemForm";
import AddReceptionForm from "./AddReceptionForm/AddReceptionForm";
import ViewForm from "./ViewForm/ViewForm";
import TransportSystemsController from "../../../../../classes/TransportSystems";

class TransportSystems extends Component {
  constructor(props) {
    super(props);

    this.transportSystems = new TransportSystemsController();

    this.state = {
      addTSForm: false,
      addReceptionForm: false,
      viewForm: false,
      transportSystems: this.transportSystems.Get()
    }
  }

  async componentDidMount() {
    return this.setState(({
      transportSystems: await this.transportSystems.syncronize()
    }));
  }

  openFormHandler = (name) => {
    return this.setState({
      [name]: true
    });
  }

  addTSSuccess = (ts) => {
    return this.setState({
      addTSForm: false,
      transportSystems: this.transportSystems.add(ts)
    });
  }

  addReceptionSuccess = (reception) => {
    return this.setState({
      addReceptionForm: false,
      transportSystems: this.transportSystems.updateById(
        reception.transportSystemId,
        {
          receptions: reception.receptions
        }
      )
    });
  }

  closeHandler = (formName) => {
    if (this.state[formName])
      return this.setState({
        [formName]: false
      });
  }

  async deleteTSHandler(id) {
    return this.setState(({
      transportSystems: await this.transportSystems.deleteById(id)
    }));
  }

  viewTSHandler = (id) => {
    return this.setState(({
      viewForm: id
    }));
  }

  render() {
    let createTableBody = (tsArray) => {
      return tsArray.map((ts, i) => {
        return <DataTableRow key={ts._id} index={i + 1} object={ts}
          deleteHandler={this.deleteTSHandler.bind(this, ts._id)}
          viewHandler={this.viewTSHandler.bind(this, ts._id)} />
      });
    };

    return (
      <div>
        <Title style={titleStyle.CAPITAL}>Transport systems</Title>
        <Toolbar clickHandler={this.openFormHandler} />
        <DataTable
          header={<DataTableHeader />}
          body={createTableBody(this.state.transportSystems)} />

        {
          this.state.addTSForm &&
          <AddTransportSystemForm
            closeHandler={this.closeHandler.bind(null, "addTSForm")}
            onSuccess={this.addTSSuccess} />
        }

        {
          this.state.addReceptionForm &&
          <AddReceptionForm
            closeHandler={this.closeHandler.bind(null, "addReceptionForm")}
            onSuccess={this.addReceptionSuccess}
            transportSystems={this.state.transportSystems} />
        }

        {
          this.state.viewForm &&
          <ViewForm
            closeHandler={this.closeHandler.bind(null, "viewForm")}
            transportSystem={
              this.transportSystems.findById(this.state.viewForm)[0]
            } />
        }

      </div>
    );
  }
}

export default TransportSystems;
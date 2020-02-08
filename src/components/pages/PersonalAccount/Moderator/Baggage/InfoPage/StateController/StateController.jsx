import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import { FormTextField, FormInputField, FormSelectField } from "../../../../parts/Form/Form";
import { baggageConnector, baggageStateConnector } from "../../../../../../../storage/connections/rootConnector";
import CheckState from "../../../../../../utils/CheckState/CheckState";

import styles from "./stateController.module.less";

class StateController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transportationStateId: "",
      stateList: null,
      finalState: null,
      loading: true,
      error: null,
      updateSucces: null
    };
  }

  componentDidMount() {
    baggageStateConnector.getList()
      .then(answer => this.setState({
        loading: false,
        stateList: answer.list,
        finalState: answer.finalState,
        transportationStateId: this.props.state
      }))
      .catch(error => this.setState({
        loading: false,
        error
      }));
  }

  componentDidUpdate() {
    this.updateSucces();
  }

  setSelect() {
    let tsId = this.state.transportationStateId,
      list = this.state.stateList;

    if (!list || !tsId)
      return;

    let currentEl = list.find(el => el._id === tsId);

    if (!currentEl)
      return;

    let newList = list.filter(el => el.index >= currentEl.index);

    return newList.map(el => ({
      key: el._id,
      value: el.state
    }));
  }

  setBody() {
    if (this.state.transportationStateId === this.state.finalState._id)
      return <FormTextField name="Transportation state" value={this.state.finalState.state} />

    let select = this.setSelect();

    if (select && select.length === 1)
      return (
        <FormInputField
          value={select[0].value}
          disabled
          disabledClass
          inputClassName={styles["input-state"]}>Transportation state</FormInputField>
      );
    else
      return (
        <FormSelectField
          values={select}
          value={this.state.transportationStateId}
          withDefault={false}
          onChange={this.changeHandler}
          disabled={this.state.loading}>Transportation state</FormSelectField>
      );
  }

  changeHandler = (name, value) => {
    this.setState({
      loading: true,
      updateSucces: null
    });

    baggageConnector.updateState({
      id: this.props.baggageId,
      transportationStateId: value
    })
      .then(answer => {
        this.setState({
          loading: false,
          transportationStateId: value,
          updateSucces: true
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          updateSucces: false
        })
      });
  }

  updateSucces() {
    if (this.state.updateSucces !== null)
      setTimeout(() => this.setState({ updateSucces: null }), 1000);
  }

  render() {
    if (!this.state.stateList)
      return <FormTextField name="Transportation state" format={{ loading: true }} />;

    return (
      <div className={styles["wrapper"]}>
        <div className={styles["label"]}>
          {this.setBody()}
        </div>

        <CSSTransition in={this.state.updateSucces === true} classNames={{ ...styles }} timeout={125} unmountOnExit>
          <CheckState checked={true} className={styles["server-answer"]} />
        </CSSTransition>

        <CSSTransition in={this.state.updateSucces === false} classNames={{ ...styles }} timeout={125} unmountOnExit>
          <CheckState checked={false} className={styles["server-answer"]} />
        </CSSTransition>
      </div>
    );
  }
}

export default StateController;
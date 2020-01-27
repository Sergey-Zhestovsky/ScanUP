import React, { Component } from "react";
import { withRouter } from "react-router";

import Title, { TitleBackLink } from "../../../parts/Title/Title";
import BodySpinner from "../../../parts/BodySpinner/BodySpinner";
import { baggageConnector } from "../../../../../../storage/connections/rootConnector";
import UserBaggageForm from "../../../parts/Form/templates/UserBaggageForm";
import If from "../../../../../parts/Condition/Condition";
import QRPopup from "../../../../../utils/PopUp/templates/QRPopup/QRPopup";
import ComplaintForm from "./ComplaintForm/ComplaintForm";
import BaggageNotFound from "../../../../../parts/errorPages/BaggageNotFound/BaggageNotFound";

class InfoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qrPopup: false,

      complaintPopup: false,
      complaintScanId: null,

      loading: true,
      baggage: null,
      error: null
    };
  }

  componentDidMount() {
    baggageConnector.get({ uId: this.props.match.params.uId })
      .then(answer => this.setState({
        loading: false,
        baggage: answer
      }))
      .catch(error => this.setState({
        loading: false,
        error
      }));
  }

  qrOpenHandler = () => {
    this.setState({ qrPopup: true });
  }

  qrCloseHandler = () => {
    this.setState({ qrPopup: false });
  }

  complaintOpenHandler = (scanId) => {
    this.setState({
      complaintPopup: true,
      complaintScanId: scanId
    });
  }

  complaintCloseHandler = () => {
    this.setState({
      complaintPopup: false,
      complaintScanId: null
    });
  }

  render() {
    let baggage = this.state.baggage;

    if (this.state.loading)
      return withWrapper(<BodySpinner />);

    if (!this.state.baggage)
      return withWrapper(<BaggageNotFound uId={baggage.uId} />);

    let body = (
      <React.Fragment>
        <UserBaggageForm
          baggage={baggage}
          qrClickHandler={this.qrOpenHandler}
          complaintHandler={this.complaintOpenHandler} />

        <If mounted={this.state.qrPopup}>
          <QRPopup closeHandler={this.qrCloseHandler} value={baggage.uId} />
        </If>

        <If mounted={this.state.complaintPopup}>
          <ComplaintForm
            closeHandler={this.complaintCloseHandler}
            scanId={this.state.complaintScanId} />
        </If>
      </React.Fragment>
    );

    return withWrapper(body);

    function withWrapper(body) {
      return (
        <React.Fragment>
          <Title><TitleBackLink /></Title>
          {body}
        </React.Fragment>
      );
    }
  }
}

export default withRouter(InfoPage);
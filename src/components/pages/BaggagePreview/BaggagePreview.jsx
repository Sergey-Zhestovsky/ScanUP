import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import UserBaggageForm from "../PersonalAccount/parts/Form/templates/UserBaggageForm";
import If from "../../parts/Condition/Condition";
import QRPopup from "../../utils/PopUp/templates/QRPopup/QRPopup";
import { authConnector } from "../../../storage/connections/rootConnector";
import RegistrationAlert from "./RegistrationAlert/RegistrationAlert";

import styles from "./baggagePreview.module.less";

export const pageConfig = {
  mainBodyClass: styles["main-body"],
  footer: false
};

class BaggagePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistered: null,
      qrPopup: false
    };
    this.baggage = this.props.location.state
      ? this.props.location.state.baggage
      : null;
  }

  componentDidMount() {
    if (!this.baggage)
      return;

    setTimeout(this.checkRegistration, 100);
  }

  checkRegistration = () => {
    authConnector.isRegistered({ passport: this.baggage.passport })
      .then(answer => this.setState({ isRegistered: answer }))
      .catch(console.error)
  }

  qrOpenHandler = () => {
    this.setState({ qrPopup: true });
  }

  qrCloseHandler = () => {
    this.setState({ qrPopup: false });
  }

  render() {
    let baggage = this.baggage;

    if (!baggage)
      return <Redirect to="/" />;

    return (
      <React.Fragment>
        {
          this.state.isRegistered === false && !this.props.isAuthorized &&
          <RegistrationAlert passport={this.baggage.passport} />
        }

        <div className={styles["form-wrapper"]}>
          <UserBaggageForm
            baggage={baggage}
            qrClickHandler={this.qrOpenHandler} />

          <If mounted={this.state.qrPopup}>
            <QRPopup closeHandler={this.qrCloseHandler} value={baggage.uId} />
          </If>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized
  }
}

export default connect(mapStateToProps)(withRouter(BaggagePreview));
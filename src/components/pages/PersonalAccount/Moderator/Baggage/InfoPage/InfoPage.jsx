import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import StateController from "./StateController/StateController";
import LatterScanForm from "./LatterScanForm/LatterScanForm";
import EmptyResponce from "./EmptyResponce/EmptyResponce";

import Title, { TitleBackLink } from "../../../parts/Title/Title";
import {
  Form, FORM_STYLES, FormBlock, FormGroup, FormGroupTitle, FormTextField,
  FormBlockTitle, FormSubGroup, FormLink
} from "../../../parts/Form/Form";
import BodySpinner from "../../../parts/BodySpinner/BodySpinner";
import ScanBlock from "../../../parts/Form/templates/ScanBlock";
import { baggageConnector } from "../../../../../../storage/connections/rootConnector";
import { faTag, faUserTag, faInfinity } from "@fortawesome/free-solid-svg-icons";

class InfoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    let baggageUId = this.props.match.params.uId,
      baggage = this.state.baggage;

    if (this.state.loading)
      return withWrapper(<BodySpinner />);

    if (!this.state.baggage)
      return withWrapper(<EmptyResponce uId={baggageUId} />);

    return withWrapper(
      <Form>

        <FormBlock>
          <FormBlockTitle style={baggage.summary ? FORM_STYLES.TITLE_COMPLETE : null} >No {baggageUId}</FormBlockTitle>
          <FormGroup>
            <FormSubGroup className={FORM_STYLES.FIT}>
              <StateController
                baggageId={baggage._id}
                state={baggage.transportationStateId} />
            </FormSubGroup>
          </FormGroup>
          <FormGroup>
            <FormTextField name="Passport No" value={baggage.passport} />
          </FormGroup>
        </FormBlock>

        <FormBlock>
          <FormGroup>
            <FormGroupTitle>Baggage tickets</FormGroupTitle>
            <FormLink icon={faUserTag} to={"/account/baggage/tikets/user/" + baggageUId}>User verify ticket</FormLink>
            <FormLink icon={faTag} to={"/account/baggage/tikets/baggage/" + baggageUId}>Baggage ticket</FormLink>
            <FormLink icon={faInfinity} to={"/account/baggage/tikets/all/" + baggageUId}>All tickets</FormLink>
          </FormGroup>
        </FormBlock>

        {
          baggage.formerScanId &&
          <ScanBlock
            title="Former scan"
            manager={baggage.formerScan.manager}
            scan={baggage.formerScan}
            scanSing={baggage.formerScan.manager.transportSystemReception.scanner.uId} />
        }

        {
          baggage.latterScanId
            ? <ScanBlock
              title="Latter scan"
              manager={baggage.latterScan.manager}
              scan={baggage.latterScan}
              scanSing={baggage.latterScan.manager.transportSystemReception.scanner.uId} />
            : <LatterScanForm baggageId={this.state.baggage._id} />
        }

        {
          baggage.comparisonId &&
          <FormBlock>
            <FormGroup>
              <FormGroupTitle>Summary comparison</FormGroupTitle>
              <FormTextField name="Unique id" value={baggage.comparison.uId} />
              <FormTextField name="Comparison state" value={baggage.comparison.name} format={{ suffix: "%" }} />
              <FormTextField name="Describe" value={baggage.comparison.describe} />
            </FormGroup>
          </FormBlock>
        }
      </Form>
    );


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
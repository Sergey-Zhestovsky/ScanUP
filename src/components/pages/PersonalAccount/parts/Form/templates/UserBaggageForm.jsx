import React from "react";
import { connect } from "react-redux";

import {
  Form, FormBlock, FormGroup, FormGroupTitle, FormTextField,
  FormBlockTitleWithQR, FormTransportationState
} from "../Form";
import ScanBlock from "./ScanBlock";

function UserBaggageForm(props) {
  let {
    baggage,
    complaintHandler = () => {}
  } = props,
    userConfirmed = props.userPassport === baggage.passport;

  if (!baggage)
    return null;

  return (
    <Form>
      <FormBlock>
        <FormBlockTitleWithQR qrClickHandler={props.qrClickHandler}>
          No {baggage.uId}
        </FormBlockTitleWithQR>
        <FormTransportationState value={baggage.transportationState.state} />
      </FormBlock>
      {
        baggage.formerScanId &&
        <ScanBlock
          title="Former scan"
          manager={baggage.formerScan.manager}
          scan={baggage.formerScan}
          withConclusion
          withComplaints={userConfirmed}
          complaintHandler={complaintHandler.bind(null, baggage.formerScanId)} />
      }
      {
        baggage.latterScanId &&
        <ScanBlock
          title="Latter scan"
          manager={baggage.latterScan.manager}
          scan={baggage.latterScan}
          withConclusion
          withComplaints={userConfirmed}
          complaintHandler={complaintHandler.bind(null, baggage.latterScanId)} />
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
}

function mapStateToProps(state) {
  return {
    userPassport: state.auth.details.passport
  };
}

export default connect(mapStateToProps)(UserBaggageForm);


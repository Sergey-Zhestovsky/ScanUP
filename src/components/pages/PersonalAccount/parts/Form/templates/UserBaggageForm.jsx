import React from "react";

import {
  Form, FormBlock, FormGroup, FormGroupTitle, FormTextField,
  FormBlockTitileWithQR, FormTransportationState
} from "../Form";
import ScanBlock from "./ScanBlock";

export default function UserBaggageForm(props) {
  let baggage = props.baggage;

  if (!baggage)
    return null;

  return (
    <Form>
      <FormBlock>
        <FormBlockTitileWithQR qrClickHandler={props.qrClickHandler}>
          No {baggage.uId}
        </FormBlockTitileWithQR>
        <FormTransportationState value={baggage.transportationState.state} />
      </FormBlock>
      {
        baggage.formerScanId &&
        <ScanBlock
          title="Former scan"
          manager={baggage.formerScan.manager}
          scan={baggage.formerScan}
          withConclusion />
      }
      {
        baggage.latterScanId &&
        <ScanBlock
          title="Latter scan"
          manager={baggage.latterScan.manager}
          scan={baggage.latterScan}
          withConclusion />
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
import React from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import Form, { FormBlock, FormGroup, FormTextField, FormGroupTitle } from "../../../parts/Form/Form";
import formatOutput from "../../../../../../modules/formatOutput";

export default function AddTransportSystemForm(props) {
  let ts = props.transportSystem;
  console.log(ts)
  return (
    <PopUp closeHandler={props.closeHandler}>
      <PopUpTitle closeHandler={props.closeHandler} >Transport system</PopUpTitle>
      <Form>
        <FormBlock>
          <FormGroup>
            <FormGroupTitle>General</FormGroupTitle>
            <FormTextField name="Full name" value={formatOutput(ts.fullName)} />
            <FormTextField name="Short name" value={formatOutput(ts.shortName)} />
            <FormTextField name="Self control" value={formatOutput(ts.selfControl)} />
            <FormTextField name="API integrate" value={formatOutput(ts.APIIntegrate)} />
            <FormTextField name="Transport system type" value={formatOutput(ts.type.name)} />
          </FormGroup>
          {
            ts.admin &&
            <FormGroup>
              <FormGroupTitle>Global moderator</FormGroupTitle>
              <FormTextField name="Name" value={formatOutput(ts.admin.name)} />
              <FormTextField name="Email" value={formatOutput(ts.admin.email)} />
            </FormGroup>
          }
          <FormGroup>
            <FormGroupTitle>Transport system type</FormGroupTitle>
            <FormTextField name="Naming standard" value={formatOutput(ts.type.namingStandard.standard)} />
            <FormTextField name="Naming length" value={formatOutput(ts.type.namingStandard.length)} />
            <FormTextField name="Allowed alphabet" value={formatOutput(ts.type.namingStandard.isAlphabet)} />
            <FormTextField name="Allowed numbers" value={formatOutput(ts.type.namingStandard.isNumber)} />
            <FormTextField name="Allowed symbols" value={formatOutput(ts.type.namingStandard.isSymbol)} />
          </FormGroup>
        </FormBlock>
      </Form>
    </PopUp>
  );
}
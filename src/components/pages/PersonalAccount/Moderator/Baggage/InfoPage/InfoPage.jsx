import React from "react";
import { withRouter } from "react-router";

import Title, { TitleBackLink } from "../../../parts/Title/Title";
import {
  Form, FormBlock, FormGroup, FormInputField, FormSelectField, FormGroupTitle,
  FormCol, FormSubmit, FormTextField, FormBlockTitle
} from "../../../parts/Form/Form";
import { formBlockStyles } from "../../../parts/Form/FormBlock/FormBlock";
import { formGroupStyles } from "../../../parts/Form/FormGroup/FormGroup";

function InfoPage(props) {
  let fullPath = props.location.pathname,
    relPath = props.match.path,
    baggageId = fullPath.slice(fullPath.indexOf(relPath) + relPath.length);

  baggageId = baggageId[0] === "/" ? baggageId.slice(1) : baggageId;

  const selectData = [{
    name: "name1",
    value: "value1"
  }, {
    name: "name2",
    value: "value2"
  }];

  return (
    <React.Fragment>
      <Title><TitleBackLink /></Title>
      <Form>
        <FormBlock>
          <FormBlockTitle>No {baggageId}</FormBlockTitle>
          <FormGroup>
            <FormSelectField name="" values={selectData}>Transportation state</FormSelectField>
          </FormGroup>
          <FormGroup>
            <FormTextField name="Passport No" value="" />
          </FormGroup>
        </FormBlock>
        <FormBlock style={formBlockStyles.COLUMN}>
          <FormCol>
            <FormGroup>
              <FormGroupTitle>Former scan</FormGroupTitle>
              <FormTextField name="T.S." value="" />
              <FormTextField name="Reception" value="" />
              <FormTextField name="Moderator" value="" />
              <FormTextField name="Scanner" value="" />
            </FormGroup>
            <FormGroup style={formGroupStyles.SINGLE}>
              <FormTextField name="Weight" value="" />
              <FormTextField name="State(Summary)" value="" />
              <FormTextField name="More" value="" />
              <FormTextField name="Time" value="" />
            </FormGroup>
          </FormCol>
          <FormCol>
            <div className="">SCAN</div>
          </FormCol>
        </FormBlock>
        <FormBlock>
          <FormGroup>
            <FormGroupTitle>Latter scan</FormGroupTitle>
            <FormTextField name="T.S." value="" />
            <FormTextField name="Reception" value="" />
            <FormTextField name="Moderator" value="" />
            <FormTextField name="Scanner" value="" />
          </FormGroup>
          <FormGroup>
          <FormSubmit>Scan</FormSubmit>
          </FormGroup>
        </FormBlock>
      </Form>
    </React.Fragment>
  );
}

export default withRouter(InfoPage);
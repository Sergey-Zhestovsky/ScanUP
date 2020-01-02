import React from "react";

import Title, { TitleBackLink } from "../../../parts/Title/Title";
import {
  Form, FormBlock, FormGroup, FormInputField,
  FormSubmit, FormTextField, FormTitle
} from "../../../parts/Form/Form";
import { formBlockStyles } from "../../../parts/Form/FormBlock/FormBlock";
import { formGroupStyles } from "../../../parts/Form/FormGroup/FormGroup";

export default function AddForm(props) {
  return (
    <React.Fragment>
      <Title><TitleBackLink /></Title>
      <Form>
        <FormTitle>New Baggage</FormTitle>
        <FormBlock>
          <FormGroup>
            <FormTextField name="T.S." value="" />
            <FormTextField name="Reception" value="" />
            <FormTextField name="Moderator" value="" />
            <FormTextField name="Scanner" value="" />
          </FormGroup>
          <FormGroup>
            <FormInputField name="Passport" type="text" placeholder="AB1234567" >Passport No.</FormInputField>
          </FormGroup>
        </FormBlock>
        <FormBlock>
          <FormGroup>
            <FormSubmit>Scan</FormSubmit>
          </FormGroup>
        </FormBlock>
        <FormBlock style={formBlockStyles.COLUMN}>
          <FormGroup style={formGroupStyles.SINGLE}>
            <FormTextField name="Weight" value="" />
            <FormTextField name="State(Summary)" value="" />
            <FormTextField name="More" value="" />
            <FormTextField name="Time" value="" />
          </FormGroup>
          <div className="">SCAN</div>
        </FormBlock>
        <FormBlock>
          <FormGroup>
            <FormSubmit>Submit</FormSubmit>
          </FormGroup>
        </FormBlock>
      </Form>
    </React.Fragment>
  );
}
import React from "react";

import PopUp, { PopUpTitle } from "../../../../../utils/PopUp/PopUp";
import Form, { FormBlock, FormGroup, FormTextField, FormGroupTitle } from "../../../parts/Form/Form";

export default function AddTransportSystemForm(props) {
  let complaint = props.complaint;

  if (!complaint)
    return null;

  return (
    <PopUp closeHandler={props.closeHandler} isActive={props.isActive}>
      <PopUpTitle closeHandler={props.closeHandler} >Complaint</PopUpTitle>
      <Form>
        <FormBlock>
          <FormGroup>
            <FormGroupTitle>Context</FormGroupTitle>
            <FormTextField name="Complaint No." value={complaint._id} />
            <FormTextField name="Reason" value={complaint.reason.name} />
            <FormTextField name="Title" value={complaint.title} />
            <FormTextField name="Message" value={complaint.message} />
          </FormGroup>
          <FormGroup>
            <FormGroupTitle>Baggage</FormGroupTitle>
            <FormTextField name="Baggage id" value={complaint.baggage.uId} />
            <FormTextField name="User passport" value={complaint.baggage.passport} />
            <FormTextField name="Former scan" value={!!complaint.baggage.formerScanId} />
            <FormTextField name="Latter scan" value={!!complaint.baggage.latterScanId} />
          </FormGroup>
        </FormBlock>
      </Form>
    </PopUp>
  );
}
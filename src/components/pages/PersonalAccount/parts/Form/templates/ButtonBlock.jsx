import { FormBlock, FormGroup, FormSubmit } from "../Form";

import React from "react";

export default function ButtonBlock(props) {
  let {
    children,
    ...rest
  } = props;

  return (
    <FormBlock>
      <FormGroup>
        <FormSubmit {...rest}>{children}</FormSubmit>
      </FormGroup>
    </FormBlock>
  );
}
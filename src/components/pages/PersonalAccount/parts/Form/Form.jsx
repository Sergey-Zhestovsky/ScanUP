import React from "react";

import FormBlock from "./FormBlock/FormBlock";
import FormTitle from "./FormTitle/FormTitle";
import FormGroup from "./FormGroup/FormGroup";
import FormInputField from "./FormInputField/FormInputField";
import FormSubmit from "./FormSubmit/FormSubmit";
import FormTextField from "./FormTextField/FormTextField";
import FormCheckBox from "./FormCheckBox/FormCheckBox";
import FormSelectField from "./FormSelectField/FormSelectField";
import FormScannerDescribe from "./FormScannerDescribe/FormScannerDescribe";
import FormLink from "./FormLink/FormLink";
import FormBlockTitle from "./FormBlockTitle/FormBlockTitle";
import FormBlockTitleWithQR from "./FormBlockTitleWithQR/FormBlockTitleWithQR";
import FormTextarea from "./FormTextarea/FormTextarea";

import styles from "./Form.module.less";

export const FORM_STYLES = {
  SUB_GROUP: styles["sub-group"],
  CENTER_FORM: styles["center-form"],
  FIT: styles["fit"],
  ERROR_MESSAGE: styles["error-message"],
  COLUMN: styles["block-col"],
  TITLE_COMPLETE: styles["title-complete"]
};

export default function Form(props) {
  let {
    onSubmit = defaultSubmit,
    children,
    disabled = false,
    ...rest
  } = props;

  function defaultSubmit(event) {
    return event.preventDefault();
  }

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className={styles["form"]}
      {...rest}>
      <fieldset className={styles["form-fieldset"]} disabled={disabled}>
        {children}
      </fieldset>
    </form>
  );
}

export function FormGroupTitle(props) {
  return <div className={styles["form-group-title"]}>{props.children}</div>
}

export function FormCol(props) {
  return <div className={styles["form-col"]}>{props.children}</div>
}

export function FormSubGroup(props) {
  let {
    children,
    forwardedRef,
    ...rest
  } = props;
  return (
    <div ref={forwardedRef} {...rest}>
      {children}
    </div>
  );
}

export function FormTransportationState(props) {
  return (
    <div className={styles["form-transportation-state"]}>
      {props.value}
    </div>
  );
}

export {
  Form, FormBlock, FormGroup, FormTitle, FormSelectField, FormScannerDescribe,
  FormInputField, FormSubmit, FormTextField, FormCheckBox, FormLink, FormBlockTitle,
  FormBlockTitleWithQR, FormTextarea
};
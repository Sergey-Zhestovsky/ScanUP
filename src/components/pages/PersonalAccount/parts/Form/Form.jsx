import React from "react";

import FormBlock from "./FormBlock/FormBlock";
import FormTitle from "./FormTitle/FormTitle";
import FormGroup from "./FormGroup/FormGroup";
import FormInputField from "./FormInputField/FormInputField";
import FormSubmit from "./FormSubmit/FormSubmit";
import FormTextField from "./FormTextField/FormTextField";
import FormCheckBox from "./FormCheckBox/FormCheckBox";
import FormSelectField from "./FormSelectField/FormSelectField";

import styles from "./Form.module.less";

export const FORM_STYLES = {
  SUB_GROUP: styles["sub-group"],
  CENTER_FORM: styles["center-form"],
  ERROR_MESSAGE: styles["error-message"]
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

export function FormBlockTitle(props) {
  return <div className={styles["form-block-title"]}>{props.children}</div>
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
    ...rest
  } = props;

  return (
    <div {...rest}>
      {children}
    </div>
  );
}

export {
  Form, FormBlock, FormGroup, FormTitle, FormSelectField,
  FormInputField, FormSubmit, FormTextField, FormCheckBox
};
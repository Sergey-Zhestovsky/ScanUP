import React from "react";

import FormBlock from "./FormBlock/FormBlock";
import FormTitle from "./FormTitle/FormTitle";
import FormGroup from "./FormGroup/FormGroup";
import FormInputField from "./FormInputField/FormInputField";
import FormSubmit from "./FormSubmit/FormSubmit";
import FormTextField from "./FormTextField/FormTextField";

import styles from "./Form.module.less";

export default function Form(props) {
  function defaultSubmit(event) {
    return event.preventDefault();
  }

  return (
    <form
      autoComplete="off"
      onSubmit={defaultSubmit}
      className={styles["form"]}
      {...props}>
      {props.children}
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

export function FormSelectField(props) {
  let {
    values,
    children,
    ...rest
  } = props;

  function setOptions(array) {
    return array.map(({ name, value }) => {
      return <option key={name} value={name}>{value}</option>
    })
  }

  return (
    <div className={styles["form-line-wrapper"]}>
      <div className={styles["form-input-field-name"]}>{children}</div>
      <select className={styles["form-select"]} {...rest}>
        {
          setOptions(values)
        }
      </select>
    </div>
  );
}

export {
  Form, FormBlock, FormGroup, FormTitle,
  FormInputField, FormSubmit, FormTextField
};
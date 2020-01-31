import React, { Component } from "react";

class Input extends Component {
  inputRef = React.createRef();

  changeHandler = (event) => {
    let name = event.target.name,
      value = event.target.value,
      validationResult = null;

    value = this.filter(value);
    validationResult = this.validation(value);
    validationResult = this.validationHandler(validationResult);

    if (validationResult && this.props.onChange)
      return this.props.onChange(name, value);
  }

  pasteHandler = (event) => {
    if (!this.props.onPaste)
      return;

    let name = event.target.name,
      value = event.clipboardData.getData("Text");

    value = this.filter(value);

    return this.props.onPaste(name, value);
  }

  focus = () => {
    return this.inputRef.current.focus();
  }

  validation(value) {
    let validator = this.props.validate,
      result = null;

    if (!validator)
      return true;

    if (validator instanceof Array) {
      for (let i = 0; i < validator.length; i++) {
        result = validatorManager(validator[i]);

        if (!validatorAnswerHandler(result))
          return result;
      }
    } else {
      result = validatorManager(validator);

      if (!validatorAnswerHandler(result))
        return result;
    }

    return result;

    function validatorManager(validator) {
      if (validator instanceof RegExp)
        return validator.test(value);

      if (validator instanceof Function)
        return validator(value);

      if (validator instanceof String)
        return validator === value;

      return true;
    }

    function validatorAnswerHandler(answer) {
      if (answer instanceof Boolean)
        return answer;

      return false;
    }
  }

  validationHandler(validationResult) {
    let result = validationResult ? validationResult : false;

    return result;
  }

  filter(value) {
    let filter = this.props.filter;

    if (!filter)
      return value;

    if (filter instanceof Array)
      for (let one of filter)
        value = one(value);

    if (filter instanceof Function)
      value = filter(value);

    return value;
  }

  render() {
    let currentProps = {
      name: this.props.name,
      className: this.props.className,
      value: this.props.value,
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      type: this.props.type || "text",
      ref: this.inputRef,
      onChange: this.changeHandler,
      onPaste: this.pasteHandler,
    };

    currentProps.value = currentProps.value === null ? "" : currentProps.value;

    if (this.props.textarea)
      return <textarea {...currentProps}></textarea>;

    return <input {...currentProps} />;
  }
}

export default Input;
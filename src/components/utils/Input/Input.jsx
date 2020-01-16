import React, { Component } from "react";

class Input extends Component {
  inputRef = React.createRef();

  changeHandler = (event) => {
    let name = event.target.name,
      value = event.target.value,
      validationResult = null;

    validationResult = this.validation(value);
    validationResult = this.validationHandler(validationResult);

    if (validationResult && this.props.onChange)
      return this.props.onChange(name, value);
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

  render() {
    return (
      <input
        ref={this.inputRef}
        name={this.props.name}
        className={this.props.className}
        type={this.props.type || "text"}
        value={this.props.value}
        onChange={this.changeHandler}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled} />
    );
  }
}

export default Input;
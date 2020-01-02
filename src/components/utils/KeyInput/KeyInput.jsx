import React, { Component } from "react";

import Input from "../Input/Input";

import styles from "./KeyInput.module.less";

const KEY_CHUNK_LENGTH = 4;
const KEY_CHUNKS_AMOUNT = 3;

class KeyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: null,
      value: new Array(KEY_CHUNKS_AMOUNT).fill("")
    }
    this.inputRefs = new Array(KEY_CHUNKS_AMOUNT);
  }

  changeHandler = (id, name, value) => {
    let handler = this.props.onChange,
      currentValue = [...this.state.value];

    currentValue[id] = value.toUpperCase();

    if (value.length === KEY_CHUNK_LENGTH)
      this.inputOverloadHandler(id);

    if (handler)
      handler(this.getValue(currentValue));

    return this.setState({
      value: currentValue
    });
  }

  getValue(value = this.state.value) {
    return value.join("");
  }

  inputOverloadHandler(id) {
    let newTarget = this.inputRefs[id + 1];

    if (newTarget && this.state.value[id + 1] === "")
      return newTarget.current.focus();
  }

  generateInputs() {
    let inputs = [],
      placeholder = new Array(KEY_CHUNK_LENGTH).fill(0).join("");

    for (let i = 0; i < KEY_CHUNKS_AMOUNT; i++) {
      this.inputRefs[i] = React.createRef();

      inputs.push(
        <Input key={i}
          className={styles["input"]}
          value={this.state.value[i]}
          onChange={this.changeHandler.bind(this, i)}
          ref={this.inputRefs[i]}
          placeholder={placeholder}
          validate={value => value.length <= KEY_CHUNK_LENGTH} />
      );
    }

    return inputs;
  }

  separateInputs(inputArray) {
    let result = [];

    for (let i = 0; i < inputArray.length; i++) {
      result.push(inputArray[i], <Separator key={i + inputArray.length} />);
    }

    result.pop();

    return result;
  }

  componentDidMount() {
    this.inputRefs[0].current.focus();
  }

  render() {
    let inputs = this.generateInputs(),
      body = this.separateInputs(inputs);

    return (
      <div className={styles["key-input"]}>
        {body}
      </div>
    );
  }
}

function Separator(props) {
  return (
    <div className={styles["separator"]}>{'\u2012'}</div>
  );
}

export default KeyInput;
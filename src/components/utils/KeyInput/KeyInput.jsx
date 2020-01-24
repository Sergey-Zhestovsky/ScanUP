import React, { Component } from "react";

import Input from "../Input/Input";
import concatClasses from "../../../modules/concatClasses";

import styles from "./KeyInput.module.less";

const KEY_CHUNK_LENGTH = 4;
const KEY_CHUNKS_AMOUNT = 3;
const AVAILABLE_SYMBOLS = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";

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
      currentValue = [...this.state.value],
      shift = id;

    if (value.length <= KEY_CHUNK_LENGTH)
      currentValue[id] = value;
    else
      [currentValue, shift] = this.multiSymbolsHandler(currentValue, id, value);

    if (value.length >= KEY_CHUNK_LENGTH)
      this.inputOverloadHandler(shift);

    if (handler)
      handler(this.getValue(currentValue));

    return this.setState({
      value: currentValue
    });
  }

  multiSymbolsHandler(currentValue, cvCursor, value) {
    currentValue[cvCursor++] = value.substr(0, KEY_CHUNK_LENGTH);
    value = value.substring(KEY_CHUNK_LENGTH);

    while (cvCursor < currentValue.length) {
      let resultInChunk = value.concat(currentValue[cvCursor]);
      let restInChunk = resultInChunk.substring(KEY_CHUNK_LENGTH);

      currentValue[cvCursor] = resultInChunk.substr(0, KEY_CHUNK_LENGTH);
      value = restInChunk;

      cvCursor++;

      if (value === "")
        break;
    }

    cvCursor -= 1;

    if (
      currentValue[cvCursor].length !== KEY_CHUNK_LENGTH
      || cvCursor + 1 === KEY_CHUNKS_AMOUNT
    )
      cvCursor -= 1;

    return [currentValue, cvCursor];
  }

  getValue(value = this.state.value) {
    return value.join("-");
  }

  inputOverloadHandler(id) {
    let newTarget = this.inputRefs[id + 1];

    if (newTarget)
      return newTarget.current.focus();
  }

  generateInputs() {
    let inputs = [],
      placeholder = new Array(KEY_CHUNK_LENGTH).fill(0).join(""),
      filterRegex = new RegExp(`[^${AVAILABLE_SYMBOLS}]`, "ig");

    for (let i = 0; i < KEY_CHUNKS_AMOUNT; i++) {
      this.inputRefs[i] = React.createRef();

      inputs.push(
        <Input key={i}
          className={styles["input"]}
          value={this.state.value[i]}
          onChange={this.changeHandler.bind(this, i)}
          ref={this.inputRefs[i]}
          placeholder={placeholder}
          filter={[
            value => value.replace(filterRegex, ""),
            value => value.toUpperCase()
          ]}
        />
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
    if (this.props.readyTimeout)
      return setTimeout(
        () => this.inputRefs[0].current.focus(),
        this.props.readyTimeout
      );
  }

  render() {
    let inputs = this.generateInputs(),
      body = this.separateInputs(inputs),
      errorClass = this.props.error ? styles["error"] : null;

    return (
      <div className={concatClasses(styles["key-input"], errorClass)}>
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
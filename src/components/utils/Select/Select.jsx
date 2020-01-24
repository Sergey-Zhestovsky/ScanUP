import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);

    this.selectRef = React.createRef();
  }
  changeHandler = (event) => {
    if (this.props.onChange)
      return this.props.onChange(this.props.name, event.target.value);
  }

  render() {
    let {
      values,
      withDefault = true,
      onChange,
      ...rest
    } = this.props;

    function setOptions(array) {
      if (!array)
        return null;

      let result = array.map(
        ({ key, value }) => <option key={key} value={key}>{value}</option>
      );

      if (withDefault)
        return [<option key={null} value="">Choose one</option>, ...result];

      return result;
    }

    return (
      <select ref={this.selectRef} onChange={this.changeHandler} {...rest}>
        {
          setOptions(values)
        }
      </select>
    );
  }
}

export default Select;
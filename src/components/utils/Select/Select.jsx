import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);

    this.selectRef = React.createRef();
  }
  changeHandler = (event) => {
    return this.props.onChange(this.props.name, event.target.value);
  }

  render() {
    let {
      values,
      withDefault,
      onChange,
      ...rest
    } = this.props;

    function setOptions(array) {
      return [<option key={null} value="">Choose one</option>].concat(
        array.map(
          ({ key, value }) => <option key={key} value={key}>{value}</option>
        )
      );
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
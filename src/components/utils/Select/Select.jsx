import React, { Component } from "react";

class Select extends Component {
  constructor(props) {
    super(props);

    this.selectRef = React.createRef();
  }
  componentDidMount() {
    return this.changeHandler({
      target: this.selectRef.current
    });
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
      return array.map(({ key, value }) => {
        return <option key={key} value={key}>{value}</option>
      })
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
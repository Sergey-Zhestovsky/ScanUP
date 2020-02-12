import React, { Component } from "react";

export default function Decorator(props) {
  function decorator() {
    let {
      visible,
      mounted,
      ...rest
    } = props,
      result = props.children;

    if (visible !== undefined) {
      //let Temp = with (result, visible);
      result = <Visible visible={visible} {...rest}>{result}</Visible> //<Temp {...rest} />;
    }
    if (mounted !== undefined)
      result = <Mounted mounted={props.mounted}>{result}</Mounted>;

    return result;
  }

  return decorator();
}

function Mounted(props) {
  let {
    mounted = true,
    children
  } = props;

  if (mounted)
    return children;

  return null;
}

class Visible extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  isVisible() {
    window.removeEventListener("scroll", this.onScroll);
    return this.props.visible();
  }

  onScroll = () => {
    if (!this.wrapperRef.current)
      return;

    let midScreen = window.scrollY + window.innerHeight / 2,
      wrapperTop = this.wrapperRef.current.offsetTop;

    if (midScreen > wrapperTop)
      return this.isVisible();
  };

  render() {
    return (
      <div ref={this.wrapperRef}>
        {this.props.children}
      </div>
    );
  }
}

import React, { Component, RefObject } from "react";
import GlowingNodes from "../../../classes/GlowingNodes";

class GlowingNodesComponent extends Component<GlowingNodesProps> {

  public glowingNodes: GlowingNodes | null;
  public canvasRef: RefObject<HTMLCanvasElement>;

  constructor(props: GlowingNodesProps) {
    super(props);
    this.glowingNodes = null;
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.createNodes();
  }

  componentDidUpdate() {
    this.createNodes();
  }

  componentWillUnmount() {
    if (this.glowingNodes)
      this.glowingNodes.close();
  }

  createNodes() {
    if (this.glowingNodes || !this.props.wrapperRef.current || !this.canvasRef.current)
      return;

    this.glowingNodes = new GlowingNodes({
      wrapper: this.props.wrapperRef.current,
      canvas: this.canvasRef.current
    });
    this.glowingNodes.init();
  }

  render() {
    return (
      <canvas ref={this.canvasRef} className={this.props.className}></canvas>
    );
  }
}

type GlowingNodesProps = {
  wrapperRef: RefObject<HTMLElement>,
  className?: string
};

export default GlowingNodesComponent;
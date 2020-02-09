interface ColorScheme {
  node: RGB;
  connection: RGB;
}

interface Coordinates {
  x: number;
  y: number;
}

export class RGB {
  constructor(
    public r: number,
    public g: number,
    public b: number
  ) { }

  get Color() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  getRgba(a: number) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
  }
}

class Mouse {

  public x: number | undefined;
  public y: number | undefined;

  constructor(public mouseRadius: number, x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  get Coordinates(): Coordinates | null {
    if (!this.isUndefined())
      return { x: this.x as number, y: this.y as number };

    return null;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isUndefined(): boolean {
    return this.x === undefined || this.y === undefined;
  }
}

class Canvas {
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(
    public canvas: HTMLCanvasElement
  ) { }

  setContext() {
    this.ctx = this.canvas.getContext("2d");
  }

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  get Context() {
    return this.ctx;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  clear() {
    if (this.ctx)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

interface GlowingNodesConfig {
  wrapper: HTMLElement;
  canvas: HTMLCanvasElement;
  nodeConnectionDistance?: number;
  siblingsLimit?: number;
  nodeMargin?: number;
  nodeMaxSpread?: number;
  visionRadius?: number;
  nodeSpeed?: number;
  appearTime?: number;
  colorScheme?: ColorScheme;
  initialPosition?: Coordinates;
}

export default class GlowingNodes {

  public wrapper: HTMLElement;
  public canvas: Canvas;
  public appearTime: number;

  private nodes: NodeList;
  private mouse: Mouse;
  private running: boolean = true;
  private appearStart: number | null = null;
  private appeared: boolean = false;
  private resizeTimeout: NodeJS.Timeout | null = null;

  constructor({
    wrapper,
    canvas,
    nodeConnectionDistance: sensitivity = 100,
    siblingsLimit = 10,
    nodeMargin: density = 65,
    nodeMaxSpread: anchorLength = 50,
    visionRadius: mouseRadius = 300,
    nodeSpeed: speed = 550,
    appearTime = 200,
    colorScheme = { node: new RGB(16, 99, 88), connection: new RGB(29, 146, 131) },
    initialPosition
  }: GlowingNodesConfig) {
    this.wrapper = wrapper;
    this.canvas = new Canvas(canvas);

    this.nodes = new NodeList({
      sensitivity,
      siblingsLimit,
      density,
      anchorLength,
      speed,
      colorScheme,
      nodeList: []
    });
    this.mouse = new Mouse(mouseRadius, initialPosition?.x, initialPosition?.y);
    this.appearTime = appearTime;
  }

  init() {
    this.canvas.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
    this.canvas.setContext();
    this.initHandlers();
    this.initNodes();
    this.redrawScene();
  }

  close() {
    this.removeHandlers();
  }

  initHandlers() {
    window.addEventListener("resize", this.resizeWindow, false);
    document.addEventListener("mousemove", this.firstMousemoveHandler, false);
    document.addEventListener("scroll", this.mouseScrollHandler, true);
  }

  removeHandlers() {
    document.removeEventListener("resize", this.resizeWindow, false);
    document.removeEventListener("mousemove", this.mousemoveHandler, false);
    document.removeEventListener("scroll", this.mouseScrollHandler, true);
  }

  initNodes() {
    this.canvas.clear();
    this.nodes.initNodes(this.canvas);
  }

  redrawScene = () => {
    if (this.appearStart && !this.mouse.isUndefined() && this.canvas.Context)
      this.drawFrame();

    requestAnimationFrame(this.frameHandler);
  }

  drawFrame() {
    this.canvas.clear();
    this.nodes.establishSiblings();
    this.appeared = this.appeared || Date.now() - (this.appearStart as number) >= this.appearTime;
    this.nodes.drawNodes(
      this.mouse,
      this.canvas.Context as CanvasRenderingContext2D,
      !this.appeared ? (Date.now() - (this.appearStart as number)) / this.appearTime : undefined
    );
  }

  frameHandler = () => {
    if (this.running)
      return this.redrawScene();
  }

  resizeWindow = () => {
    let resize = () => {
      this.running = true;
      this.init();
    };

    this.running = false;
    clearTimeout(this.resizeTimeout as NodeJS.Timeout);
    this.resizeTimeout = setTimeout(resize, 66);
  }

  firstMousemoveHandler = (e: MouseEvent) => {
    document.removeEventListener("mousemove", this.firstMousemoveHandler, false);
    this.appearStart = Date.now();
    this.mousemoveHandler(e);
    document.addEventListener("mousemove", this.mousemoveHandler, false);
  }

  mousemoveHandler = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY + window.scrollY;
  }

  mouseScrollHandler() {
    let lastScrolled = 0;

    return () => {
      if (lastScrolled !== 0 && lastScrolled !== window.scrollY && !this.mouse.isUndefined()) {
        (this.mouse.y as number) += window.scrollY - lastScrolled;
      }

      lastScrolled = window.scrollY;
    };
  }
}

interface NodeListConfig {
  sensitivity: number;
  siblingsLimit: number;
  density: number;
  anchorLength: number;
  speed: number;
  colorScheme: ColorScheme;
  nodeList?: Node[];
}

class NodeList {
  public sensitivity: number;
  public siblingsLimit: number;
  public density: number;
  public anchorLength: number;
  public speed: number;
  public colorScheme: ColorScheme;
  public nodeList: Node[];

  constructor({
    sensitivity,
    siblingsLimit,
    density,
    anchorLength,
    speed,
    colorScheme,
    nodeList
  }: NodeListConfig) {
    this.sensitivity = sensitivity;
    this.siblingsLimit = siblingsLimit;
    this.density = density;
    this.anchorLength = anchorLength;
    this.speed = speed;
    this.colorScheme = colorScheme;
    this.nodeList = nodeList || [];
  }

  initNodes(canvas: Canvas) {
    this.nodeList = [];

    for (let i = this.density; i < canvas.width; i += this.density) {
      for (let j = this.density; j < canvas.height; j += this.density) {
        this.nodeList.push(new Node(i, j, this.anchorLength));
      }
    }
  }

  establishSiblings() {
    for (let node of this.nodeList)
      node.findSiblings(this.nodeList, this.sensitivity, this.siblingsLimit);
  }

  drawNodes(mouse: Mouse, ctx: CanvasRenderingContext2D, appearCoefficient?: number) {
    for (let i = 0; i < this.nodeList.length; i++) {
      let node = this.nodeList[i];

      node.setBrightness(mouse, appearCoefficient);

      if (node.brightness) {
        node.drawNode(this.colorScheme.node, this.siblingsLimit, ctx);
        node.drawConnections(this.colorScheme.connection, this.sensitivity, ctx);
      }

      node.moveNode(this.anchorLength, this.speed);
    }
  }
}

class Node implements Coordinates {

  public anchorX: number;
  public anchorY: number;
  public x: number;
  public y: number;
  private vx: number;
  private vy: number;
  private energy: number;
  private radius: number;
  private siblings: Node[] = [];
  public brightness: number = 0;

  readonly circ: number = 2 * Math.PI;

  constructor(x: number, y: number, anchorLength: number) {
    this.anchorX = x;
    this.anchorY = y;
    this.x = Math.random() * (x - (x - anchorLength)) + (x - anchorLength);
    this.y = Math.random() * (y - (y - anchorLength)) + (y - anchorLength);
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.energy = Math.random() * 100;
    this.radius = Math.random();
  }

  findSiblings(nodeList: Node[], sensitivity: number, siblingsLimit: number) {
    this.siblings = [];

    for (let i = 0; i < nodeList.length; i++) {
      let currentNode = nodeList[i];

      if (this !== currentNode) {
        let distance = this.calcDistance(currentNode);

        if (distance < sensitivity) {
          if (this.siblings.length < siblingsLimit) {
            this.siblings.push(currentNode);
          } else {
            let maxDistance = 0, s = 0;

            for (let k = 0; k < siblingsLimit; k++) {
              let nodeSiblingDistance = this.calcDistance(this.siblings[k]);

              if (nodeSiblingDistance > maxDistance) {
                maxDistance = nodeSiblingDistance;
                s = k;
              }
            }

            if (distance < maxDistance) {
              this.siblings.splice(s, 1);
              this.siblings.push(currentNode);
            }
          }
        }
      }
    }
  }

  drawNode(nodeColor: RGB, siblingsLimit: number, ctx: CanvasRenderingContext2D) {
    let color = nodeColor.getRgba(this.brightness);

    ctx.beginPath();
    ctx.arc(this.x, this.y,
      2 * this.radius + 2 * this.siblings.length / siblingsLimit, 0, this.circ);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawConnections(connectionColor: RGB, sensitivity: number, ctx: CanvasRenderingContext2D) {
    for (var i = 0; i < this.siblings.length; i++) {
      let dist = this.calcDistance(this.siblings[i]);

      if (dist > sensitivity)
        continue;

      let color = connectionColor.getRgba(this.brightness);

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
      ctx.lineWidth = 1 - dist / sensitivity;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }

  moveNode(anchorLength: number, speed: number) {
    this.energy -= 1;
    if (this.energy < 1) {
      this.energy = Math.random() * 100;
      if (this.x - this.anchorX < -anchorLength) {
        this.vx = Math.random() * 2;
      } else if (this.x - this.anchorX > anchorLength) {
        this.vx = Math.random() * -2;
      } else {
        this.vx = Math.random() * 4 - 2;
      }
      if (this.y - this.anchorY < -anchorLength) {
        this.vy = Math.random() * 2;
      } else if (this.y - this.anchorY > anchorLength) {
        this.vy = Math.random() * -2;
      } else {
        this.vy = Math.random() * 4 - 2;
      }
    }
    this.x += this.vx * this.energy / speed;
    this.y += this.vy * this.energy / speed;
  }

  calcDistance(node: Coordinates) {
    return Math.sqrt(Math.pow(this.x - node.x, 2) + (Math.pow(this.y - node.y, 2)));
  }

  setBrightness(mouse: Mouse, appearCoefficient?: number) {
    let distance = this.calcDistance(mouse.Coordinates as Coordinates);

    if (distance < mouse.mouseRadius) {
      this.brightness = 1 - distance / mouse.mouseRadius;

      if (appearCoefficient)
        this.brightness = this.brightness * appearCoefficient;
    } else
      this.brightness = 0;
  }
}
export default class GlowingNodes {
  constructor({
    wrapper,
    canvas,
    nodeConnectionDistance: sensitivity = 100,
    sublingLimit: siblingsLimit = 10,
    nodeMargin: density = 65,
    nodeMaxSpread: anchorLength = 50,
    visionRadious: mouseRadius = 300,
    nodeSpeed: speed = 550,
    colorScheme: colorScheme = { node: `16, 99, 88`, connection: `29, 146, 131` },
    initialPosition: initialPosition = {}
  }) {
    this.wrapper = wrapper;
    this.canvas = canvas;
    this.sensitivity = sensitivity;
    this.siblingsLimit = siblingsLimit;
    this.density = density;
    this.anchorLength = anchorLength;
    this.mouseRadius = mouseRadius;
    this.speed = speed;
    this.colorScheme = colorScheme;
    this.initialPosition = initialPosition;

    this.ctx = null;
    this.circ = 2 * Math.PI;
    this.nodes = [];
    this.mouse = {
      x: initialPosition.x || undefined,
      y: initialPosition.y || undefined
    };

    this.NODES_QTY = 0;
    this.running = true;
    this.resizeTimeout = null;
  }

  init() {
    this.setCanvasSize();
    this.ctx = this.canvas.getContext("2d");

    this.initHandlers();
    this.initNodes();
    this.redrawScene();
  }

  close() {
    this.removeHandlers();
  }

  initHandlers() {
    window.addEventListener("resize", this.resizeWindow, false);
    document.addEventListener("mousemove", this.mousemoveHandler, false);
    document.addEventListener("scroll", (e) => this.mouseScrollHandler, true);
  }

  removeHandlers() {
    document.removeEventListener("resize", this.resizeWindow, false);
    this.wrapper.removeEventListener("mousemove", this.mousemoveHandler, false);
    document.removeEventListener("scroll", (e) => this.mouseScrollHandler, true);
  }

  initNodes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.nodes = [];
    this.NODES_QTY = 0;

    for (let i = this.density; i < this.canvas.width; i += this.density) {
      for (let j = this.density; j < this.canvas.height; j += this.density) {
        this.nodes.push(new Node(i, j, this.anchorLength));
        this.NODES_QTY++;
      }
    }
  }

  findSiblings() {
    let node1, node2, distance;

    for (let i = 0; i < this.NODES_QTY; i++) {
      node1 = this.nodes[i];
      node1.siblings = [];

      for (let j = 0; j < this.NODES_QTY; j++) {
        node2 = this.nodes[j];

        if (node1 !== node2) {
          distance = node1.calcDistance(node2);

          if (distance < this.sensitivity) {
            if (node1.siblings.length < this.siblingsLimit) {
              node1.siblings.push(node2);
            } else {
              let node_sibling_distance = 0,
                max_distance = 0, s;

              for (let k = 0; k < this.siblingsLimit; k++) {
                node_sibling_distance = node1.calcDistance(node1.siblings[k]);

                if (node_sibling_distance > max_distance) {
                  max_distance = node_sibling_distance;
                  s = k;
                }
              }

              if (distance < max_distance) {
                node1.siblings.splice(s, 1);
                node1.siblings.push(node2);
              }
            }
          }
        }
      }
    }
  }

  redrawScene = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.findSiblings();

    let node, distance;

    for (let i = 0; i < this.NODES_QTY; i++) {
      node = this.nodes[i];

      distance = node.calcDistance({
        x: this.mouse.x,
        y: this.mouse.y
      });

      if (distance < this.mouseRadius) {
        node.brightness = 1 - distance / this.mouseRadius;
      } else {
        node.brightness = 0;
      }
    }

    for (let i = 0; i < this.NODES_QTY; i++) {
      node = this.nodes[i];

      if (node.brightness) {
        node.drawNode(this.colorScheme, this.siblingsLimit, this.circ, this.ctx);
        node.drawConnections(this.colorScheme, this.sensitivity, this.ctx);
      }

      node.moveNode(this.anchorLength, this.speed);
    }

    requestAnimationFrame(this.frameHandler);
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
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(resize, 66);
  }

  setCanvasSize() {
    this.canvas.width = this.wrapper.clientWidth;
    this.canvas.height = this.wrapper.clientHeight;
  }

  mousemoveHandler = (e) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY + window.scrollY;
  }

  mouseScrollHandler() {
    let lastScrolled = 0;

    return () => {
      if (lastScrolled != 0 && lastScrolled != window.scrollY) {
        this.mouse.y += window.scrollY - lastScrolled;
      }

      lastScrolled = window.scrollY;
    };
  }
}

export class Node {
  constructor(x, y, anchorLength) {
    this.anchorX = x;
    this.anchorY = y;
    this.x = Math.random() * (x - (x - anchorLength)) + (x - anchorLength);
    this.y = Math.random() * (y - (y - anchorLength)) + (y - anchorLength);
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.energy = Math.random() * 100;
    this.radius = Math.random();
    this.siblings = [];
    this.brightness = 0;
  }

  drawNode(colorScheme, siblingsLimit, circ, ctx) {
    let color = `rgba(${colorScheme.node}, ${this.brightness})`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 2 * this.radius + 2 * this.siblings.length / siblingsLimit, 0, circ);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawConnections(colorScheme, sensitivity, ctx) {
    for (var i = 0; i < this.siblings.length; i++) {
      let dist = this.calcDistance(this.siblings[i]);

      if (dist > sensitivity)
        continue;

      let color = `rgba(${colorScheme.connection}, ` + this.brightness + ")";

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
      ctx.lineWidth = 1 - dist / sensitivity;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }

  moveNode(anchorLength, speed) {
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

  calcDistance(node) {
    return Math.sqrt(Math.pow(this.x - node.x, 2) + (Math.pow(this.y - node.y, 2)));
  }
}
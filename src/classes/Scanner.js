import {
  Scene, Color, AmbientLight, DirectionalLight, PerspectiveCamera, WebGLRenderer, Box3
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Scanner {
  constructor({ contsinerWidth, containerHeight }) {
    this.contsinerWidth = contsinerWidth;
    this.containerHeight = containerHeight;

    this.scene = this.getScene();
    this.camera = this.getCamera();
    this.renderer = this.getRender();
    this.controls = this.getControls(this.camera, this.renderer);
  }

  getScene() {
    let scene = new Scene();

    scene.background = new Color("#343e42");
    scene.add(new AmbientLight(0xffffff, .25));

    let keyLight = new DirectionalLight(new Color('hsl(30, 100%, 75%)'), 1.25);
    keyLight.position.set(-100, 0, 100).normalize();
    scene.add(keyLight);

    let fillLight = new DirectionalLight(new Color('hsl(240, 100%, 75%)'), 1.15);
    fillLight.position.set(100, 0, 100).normalize();
    scene.add(fillLight);

    let backLight = new DirectionalLight(0xffffff, .75);
    backLight.position.set(100, 0, -100).normalize();
    scene.add(backLight);

    let topLight = new DirectionalLight(0xffffff, .75);
    topLight.position.set(0, 100, 0).normalize();
    scene.add(topLight);

    let buttomLight = new DirectionalLight(0xffffff, .75);
    buttomLight.position.set(0, -100, 0).normalize();
    scene.add(buttomLight);

    return scene;
  }

  getCamera() {
    return new PerspectiveCamera(45, this.contsinerWidth / this.containerHeight, 1, 1000);
  }

  updateCamera() {
    this.camera.aspect = this.contsinerWidth / this.containerHeight;
    this.camera.updateProjectionMatrix();
  }

  getRender() {
    let renderer = new WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    this.setSize(renderer);
    renderer.setClearColor(new Color("hsl(0, 0%, 10%)"));

    return renderer;
  }

  getControls(camera, renderer) {
    let controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = .1;
    controls.screenSpacePanning = true;

    return controls;
  }

  async load(href, onError, onSucces = () => { }, onLoading) {
    if (!href)
      return;

    let loader = new GLTFLoader();

    loader.load(href, (gltf) => {
      onSucces();

      let obj = gltf.scene.children[0];
      let bbox = this.setZoom(obj);

      this.scene.add(obj);
      this.centeredCamera(obj, bbox);
    }, onLoading, onError);
  }

  setZoom(object, bbox) {
    if (!bbox)
      bbox = new Box3().setFromObject(object);

    let absBbox = {
      z: bbox.max.z - bbox.min.z,
      x: bbox.max.x - bbox.min.x,
      y: bbox.max.y - bbox.min.y
    },
      maxBbox = Math.max(absBbox.x, absBbox.y, absBbox.z);

    this.camera.position.z = maxBbox * 1.75;

    return bbox;
  }

  centeredCamera(object, bbox) {
    if (!bbox)
      bbox = new Box3().setFromObject(object);

    bbox.getCenter(this.controls.target);

    return bbox;
  }

  updateSize(newWidth, newHeight) {
    if (this.contsinerWidth === newWidth && this.containerHeight === newHeight)
      return;

    this.contsinerWidth = newWidth;
    this.containerHeight = newHeight;
    this.setSize();
    this.updateCamera();
  }

  setSize(renderer = this.renderer) {
    return renderer.setSize(this.contsinerWidth, this.containerHeight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  getDomElement() {
    return this.renderer.domElement;
  }
}

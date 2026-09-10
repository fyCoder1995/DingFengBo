import * as THREE from "three";
import scene from "./scene/index.js";
import camera from "./camera.js";
import { labelRenderer } from "./scene/tag.js";
import { massageBoxRenderer } from "./scene/messageTag.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;  // 电影级，默认
// renderer.toneMappingExposure = 1.2;  // 可调 0.8~1.2
renderer.setClearColor(0x005577, 1);
var controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  massageBoxRenderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
export default renderer;

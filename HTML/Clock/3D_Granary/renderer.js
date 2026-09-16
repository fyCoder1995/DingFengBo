import * as THREE from "three";
import scene from "./scene/index.js";
import camera from "./camera.js";
import { labelRenderer } from "./scene/tag.js";
import { massageBoxRenderer } from "./scene/messageTag.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;  // 电影级，默认
// renderer.toneMappingExposure = 1.2;  // 可调 0.8~1.2
renderer.setClearColor(0x005577, 1);
let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = 1.5;
controls.minDistance = 50;
controls.maxDistance = 1200;
controls.update();

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  massageBoxRenderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

function resizeRenderer() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
  massageBoxRenderer.setSize(width, height);
}


window.addEventListener("resize", resizeRenderer);
export default renderer;

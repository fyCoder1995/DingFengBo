import * as THREE from "three";
import mesh from "./scene/mesh.js";
import scene from "./scene/index.js";
import camera from "./camera.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.render(scene, camera);
var controls = new OrbitControls(camera, renderer.domElement);
// controls.update();
// controls.addEventListener("change", () => {
//   renderer.render(scene, camera);
// });

function render() {
  mesh.rotateX(0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

export default renderer;

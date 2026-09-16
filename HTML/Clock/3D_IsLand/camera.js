import * as THREE from "three";

let camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  1,
  20000,
);

camera.position.set(0, 600, 1600);
camera.lookAt(0, 0, 0);

export default camera;

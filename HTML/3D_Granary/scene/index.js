import * as THREE from "three";
import { model } from "./model.js";
import { directionalLight1, directionalLight2, ambientLight } from "./light.js";
let scene = new THREE.Scene();

scene.add(model);
// scene.fog = new THREE.Fog(0x005577, -500, 1000); //  线性雾
scene.fog = new THREE.FogExp2(0x005577, 0.0026); //  指数雾

// const axesHelper = new THREE.AxesHelper( 50 );
// scene.add(axesHelper);

scene.add(ambientLight);
scene.add(directionalLight1);
// scene.add(directionalLight2);

export default scene;

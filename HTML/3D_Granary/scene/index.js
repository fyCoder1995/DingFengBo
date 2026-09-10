import * as THREE from 'three';
import mesh from './mesh.js';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);
const axesHelper = new THREE.AxesHelper( 50 );

scene.add(mesh);
scene.add( axesHelper );
export default scene;
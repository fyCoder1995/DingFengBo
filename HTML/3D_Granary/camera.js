import * as THREE from 'three';

var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(100, 100, 100); 
camera.lookAt(0, 0, 0); 

export default camera;
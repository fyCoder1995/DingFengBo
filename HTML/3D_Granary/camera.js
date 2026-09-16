import * as THREE from 'three';

// const k = window.innerWidth / window.innerHeight; 
// const s = 100;
// let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 3000);

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);

camera.position.set(220,140,140);
camera.lookAt(0, 0, 0); 

export default camera;
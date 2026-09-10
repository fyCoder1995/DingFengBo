import * as THREE from 'three';

var k = window.innerWidth / window.innerHeight; 
var s = 100;
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 3000);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);

camera.position.set(320,160,200);
camera.lookAt(0, 0, 0); 

export default camera;
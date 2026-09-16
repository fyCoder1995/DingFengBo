import * as THREE from 'three';

// 平行光1
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 6.6);
directionalLight1.position.set(400, 200, 300);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 6.6);
directionalLight2.position.set(-400, -200, -300);

//环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 6.6);


export {directionalLight1, directionalLight2, ambientLight};

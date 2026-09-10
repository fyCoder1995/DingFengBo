import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(40, 40, 40);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

let mesh = new THREE.Mesh(geometry, material);

export default mesh;
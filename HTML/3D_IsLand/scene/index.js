import * as THREE from "three";
import { ambientLight, dirLight, pointLight } from "./light.js";
import { Water } from "three/addons/objects/Water.js";
import { Sky } from "three/addons/objects/Sky.js";
import { model, mixers } from "./model.js";

let scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);

scene.add(ambientLight);
scene.add(dirLight);
scene.add(pointLight);

// 海水
const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
const water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    "./assets/images/water_normals.png",
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
    },
  ),
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x0055cc,
  distortionScale: 4,
  fog: scene.fog !== undefined,
});
water.rotation.x = -Math.PI / 2;
scene.add(water);

// 天空
const sky = new Sky();
sky.scale.setScalar(10000);
scene.add(sky);
const skyUniforms = sky.material.uniforms;
skyUniforms["turbidity"].value = 2; // 浑浊度 2-20，数值越小越晴朗
skyUniforms["rayleigh"].value = 2;
skyUniforms["mieCoefficient"].value = 0.005;
skyUniforms["mieDirectionalG"].value = 0.8;

scene.add(model);

export { scene, sky, water, mixers };

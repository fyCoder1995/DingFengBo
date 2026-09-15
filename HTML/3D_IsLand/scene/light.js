import * as THREE from "three";
import { Lensflare, LensflareElement } from "three/addons/objects/Lensflare.js";

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 6.6);

// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 6.6);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-1, 1.75, 1);
dirLight.position.multiplyScalar(30);

// 太阳点光源
const pointLight = new THREE.PointLight(0xffffff, 6.6, 2000);
pointLight.position.set(0, 45, -2000);
const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load("assets/textures/lensflare0.png");
const textureFlare1 = textureLoader.load("assets/textures/lensflare1.png");
// 镜头光晕
const lensflare = new Lensflare();
lensflare.addElement(
  new LensflareElement(textureFlare0, 600, 0, pointLight.color),
);
lensflare.addElement(new LensflareElement(textureFlare1, 60, 0.6));
lensflare.addElement(new LensflareElement(textureFlare1, 60, 0.7));
lensflare.addElement(new LensflareElement(textureFlare1, 70, 0.7));
lensflare.addElement(new LensflareElement(textureFlare1, 120, 0.9));
lensflare.addElement(new LensflareElement(textureFlare1, 50, 1));
pointLight.add(lensflare);

export { ambientLight, dirLight, pointLight };

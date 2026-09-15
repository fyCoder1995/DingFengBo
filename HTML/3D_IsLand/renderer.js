import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { scene, sky, water, mixers } from "./scene/index.js";
import camera from "./camera.js";
import Animations from "./animations.js";
import TWEEN from "three/addons/libs/tween.module.js";
import { initModel } from "./scene/model.js";

const clock = new THREE.Clock();

let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.toneMapping = THREE.ACESFilmicToneMapping; // 色调映射

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = 1.5;
controls.minDistance = 50;
controls.maxDistance = 1200;
controls.update();

// 点
const raycaster = new THREE.Raycaster();
const points = [
  {
    position: new THREE.Vector3(10, 43, 2),
    element: document.querySelector(".point0"),
  },
  {
    position: new THREE.Vector3(-8, 4, 36),
    element: document.querySelector(".point1"),
  },
  {
    position: new THREE.Vector3(-56, 2, 54),
    element: document.querySelector(".point2"),
  },
  {
    position: new THREE.Vector3(-108, 84, -140),
    element: document.querySelector(".point3"),
  },
  {
    position: new THREE.Vector3(30, 41, -140),
    element: document.querySelector(".point4"),
  },
  {
    position: new THREE.Vector3(-10, 160, -390),
    element: document.querySelector(".point5"),
  },
];

document.querySelectorAll(".point").forEach((element) => {
  element.addEventListener(
    "click",
    (event) => {
      let className = event.target.classList[event.target.classList.length - 1];
      switch (className) {
        case "label0":
          Animations.animateCamera(
            camera,
            controls,
            { x: -15, y: 80, z: 60 },
            { x: 0, y: 0, z: 0 },
            1600,
            () => {},
          );
          break;
        case "label1":
          Animations.animateCamera(
            camera,
            controls,
            { x: -20, y: 10, z: 60 },
            { x: 0, y: 0, z: 0 },
            1600,
            () => {},
          );
          break;
        case "label2":
          Animations.animateCamera(
            camera,
            controls,
            { x: -70, y: 4, z: 90 },
            { x: 0, y: 0, z: 0 },
            1800,
            () => {},
          );
          break;
        case "label5":
          Animations.animateCamera(
            camera,
            controls,
            { x: 0, y: 80, z: -820 },
            { x: 0, y: 0, z: 0 },
            1800,
            () => {},
          );
          break;
        default:
          Animations.animateCamera(
            camera,
            controls,
            { x: 0, y: 40, z: 140 },
            { x: 0, y: 0, z: 0 },
            1600,
            () => {},
          );
          break;
      }
    },
    false,
  );
});

function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();
  water.material.uniforms.time.value += delta;
  if (sky) {
    water.material.uniforms.sunDirection.value.copy(
      sky.material.uniforms.sunPosition.value,
    );
  }
  mixers &&
    mixers.forEach((mixer) => {
      mixer.update(delta);
    });
  controls && controls.update();
  const timer = Date.now() * 0.0005;
  TWEEN && TWEEN.update();
  camera && (camera.position.y += Math.sin(timer) * 0.05);
  // 遍历点
  for (const point of points) {
    let screenPosition = point.position.clone();
    screenPosition.project(camera);
    raycaster.setFromCamera(screenPosition, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length === 0) {
      // 未找到相交点，显示
      point.element.classList.add("visible");
    } else {
      // 获取相交点的距离和点的距离
      const intersectionDistance = intersects[0].distance;
      const pointDistance = point.position.distanceTo(camera.position);

      // 相交点距离比点距离近，隐藏；相交点距离比点距离远，显示
      intersectionDistance < pointDistance
        ? point.element.classList.remove("visible")
        : point.element.classList.add("visible");
    }
    const translateX = screenPosition.x * window.innerWidth * 0.5;
    const translateY = -screenPosition.y * window.innerHeight * 0.5;
    point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }
  renderer.render(scene, camera);
}

render();

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false,
);

// 太阳
const sun = new THREE.Vector3();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const phi = THREE.MathUtils.degToRad(88);
const theta = THREE.MathUtils.degToRad(180);
sun.setFromSphericalCoords(1, phi, theta);
sky.material.uniforms["sunPosition"].value.copy(sun);
water.material.uniforms["sunDirection"].value.copy(sun).normalize();
scene.environment = pmremGenerator.fromScene(sky).texture;

async function init() {
  const result = await initModel();
  console.log(result);
  if (result) {
    Animations.animateCamera(
      camera,
      controls,
      { x: -38, y: 6, z: 160 },
      { x: 0, y: 0, z: 0 },
      4000,
      () => {
        document.getElementById("pointBox").style.display = "block";
      },
    );
  }
}
init()

export default renderer;

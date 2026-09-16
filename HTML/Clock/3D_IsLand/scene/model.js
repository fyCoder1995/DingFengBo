import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

let mixers = [];

let model = new THREE.Group();
const loadingStatus = document.querySelector(".loading-status");
const loadingScreen = document.querySelector("#loading-screen");
let currentValue = 0;

function initModel() {
  return new Promise((resolve) => {
    // 小岛
    const island = new GLTFLoader();
    island.load(
      "./assets/models/island.glb",
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.metalness = 0.5;
            child.material.roughness = 0.5;
          }
        });
        gltf.scene.position.set(0, -2, 0);
        gltf.scene.scale.set(33, 33, 33);
        model.add(gltf.scene);
        modelReady();
      },
      function (progress) {
        if (loadingStatus && progress.total) {
          currentValue =
            Math.round((progress.loaded / progress.total) * 100) >= 100
              ? 100
              : Math.round((progress.loaded / progress.total) * 100);
          loadingStatus.textContent = `模型加载中 ${currentValue}%`;
        }
      },
      function (error) {
        if (loadingStatus) {
          loadingStatus.textContent = "模型加载失败，请检查资源路径";
        }
        console.error("模型加载失败", error);
      },
    );
    // 模型加载完淡出动画
    function modelReady() {
      if (loadingScreen && loadingStatus) {
        loadingStatus.textContent = "场景准备就绪";
        loadingScreen.classList.add("is-hidden");
        loadingScreen.addEventListener(
          "transitionend",
          () => {
            loadingScreen.remove();
            resolve(true);
          },
          { once: true },
        );
      }
    }
    // 彩虹
    const shaderBaseUrl = new URL("../assets/shaders/", import.meta.url);
    Promise.all([
      fetch(new URL("vertex.glsl", shaderBaseUrl)).then((response) =>
        response.text(),
      ),
      fetch(new URL("fragment.glsl", shaderBaseUrl)).then((response) =>
        response.text(),
      ),
    ])
      .then(([vertexShader, fragmentShader]) => {
        const material = new THREE.ShaderMaterial({
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
          vertexShader,
          fragmentShader,
        });
        const torusGro = new THREE.TorusGeometry(200, 10, 50, 100, Math.PI);
        const torus = new THREE.Mesh(torusGro, material);
        torus.opacity = 0.1;
        torus.position.set(0, -50, -400);
        model.add(torus);
      })
      .catch((error) => console.error("彩虹 shader 加载失败", error));

    // 小鸟
    island.load("./assets/models/bird/scene.gltf", (gltf) => {
      let bird1 = gltf.scene.children[0];
      bird1.scale.set(28, 28, 28);
      bird1.position.set(-100, 80, -150);
      bird1.rotation.y = -1;
      bird1.castShadow = true;
      model.add(bird1);

      let bird2 = SkeletonUtils.clone(bird1);
      bird2.position.set(150, 80, -300);
      model.add(bird2);

      const mixer1 = new THREE.AnimationMixer(bird1);
      mixer1.clipAction(gltf.animations[0]).setDuration(1.2).play();
      mixers.push(mixer1);

      const mixer2 = new THREE.AnimationMixer(bird2);
      mixer2.clipAction(gltf.animations[0]).setDuration(1.8).play();
      mixers.push(mixer2);
    });
  });
}
initModel();

export { model, mixers, initModel };

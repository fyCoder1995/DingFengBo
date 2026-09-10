import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { tag } from "./tag.js";
import { createFlame } from "./flame.js";

let model = new THREE.Group();
let loader = new GLTFLoader();
let granaryArr = []; //所有粮仓模型对象的集合，用于射线拾取

let P_02Flame = null;
loader.load(
  "./assets/model.glb",
  function (gltf) {
    gltf.scene.traverse(function (object) {
      if (object.type === "Mesh") {
        object.material = new THREE.MeshLambertMaterial({
          map: object.material.map,
          color: object.material.color,
        });
      }
    });

    let group = gltf.scene.getObjectByName("粮仓");
    group.traverse(function (object) {
      if (object.type === "Mesh") {
        granaryArr.push(object);
        let tagLabel = tag(object.name);
        let pos = new THREE.Vector3();
        object.getWorldPosition(pos);
        if (object.parent.name === "立筒仓") {
          pos.y += 36;
        } else if (object.parent.name === "浅圆仓") {
          pos.y += 20;
        } else if (object.parent.name === "平房仓") {
          pos.y += 17;
        }
        tagLabel.position.copy(pos);
        model.add(tagLabel);
      }
    });

    model.add(gltf.scene);

    P_02Flame = granaryFlame(gltf, "P_02");
    model.add(P_02Flame);

    TestFalme(gltf);
  },
  modelReady,
);
// 模型加载前过渡动画
function modelReady() {
  const loadingScreen = document.querySelector("#loading-screen");
  const loadingStatus = document.querySelector(".loading-status");
  try {
    loadingStatus.textContent = "场景准备就绪";
    loadingScreen.classList.add("is-hidden");
    loadingScreen.addEventListener(
      "transitionend",
      () => loadingScreen.remove(),
      { once: true },
    );
  } catch (error) {
    loadingStatus.textContent = "无法加载模型";
    console.log(error);
  }
}

function granaryFlame(gltf, name) {
  let flame = createFlame();
  let granary = gltf.scene.getObjectByName(name);
  let pos = new THREE.Vector3();
  granary.getWorldPosition(pos);
  flame.position.copy(pos);
  if (granary.parent.name == "立筒仓") {
    flame.position.y += 36;
  } else if (granary.parent.name == "浅圆仓") {
    flame.position.y += 20;
  } else if (granary.parent.name == "平房仓") {
    flame.position.y += 17;
  }
  flame.position.y += -4;
  let flameTag = tag("粮仓 " + name + " 失火了 ！！！");
  flame.add(flameTag);
  flameTag.position.y += 40;
  flame.flameTag = flameTag;
  return flame;
}

// 测试火灾开始，火灾停止
function TestFalme(gltf) {
  setTimeout(function () {
    P_02Flame.stop();
    model.remove(P_02Flame);
    P_02Flame.remove(P_02Flame.flameTag);
  }, 3000);

  // 假设1秒后Q_05粮仓火灾
  setTimeout(function () {
    var flame = granaryFlame(gltf, "Q_05");
    model.add(flame);
  }, 1000);

  // 假设1秒后L_04粮仓火灾
  setTimeout(function () {
    var flame = granaryFlame(gltf, "L_04"); //
    model.add(flame);
  }, 2000);
}

export { model, granaryArr };

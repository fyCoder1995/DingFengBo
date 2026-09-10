import * as THREE from "three";
import camera from "../camera.js";
import { granaryArr } from "./model.js";
import renderer from "../renderer.js";
import { messageBox } from "./messageTag.js";
import messageData from "../assets/messageData.js"; // 粮仓数据

// 动态数据对应id
let idArr = [
  "granaryName",
  "tempText",
  "grain",
  "grainImg",
  "weight",
  "granaryHeight",
  "grainHeight",
];
let chooseMesh = null;
function onClick(event) {
  if (chooseMesh) {
    messageBox.element.style.visibility = "hidden";
    chooseMesh.material.color.set(0xffffff); //恢复初始颜色
  }
  let intersects = getIntersects(event);
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object;
    chooseMesh.material.color.set(0x00ffff);
    chooseMesh.point = intersects[0].point;
    idArr.forEach(function (id) {
      let dom = document.getElementById(id);
      if (id == "grainImg") {
        dom.src = messageData[chooseMesh.name][id]; //设置图片路径
      } else if (id === "weight") {
        weightAnimation();
      } else {
        dom.innerHTML = messageData[chooseMesh.name][id];
      }
    });
    messageBox.element.style.visibility = "visible";
    messageBox.position.copy(chooseMesh.point);
  } else {
    chooseMesh = null;
  }
}

function onMouseMove(event) {
  let intersects = getIntersects(event);
  renderer.domElement.style.cursor =
    intersects.length > 0 ? "pointer" : "default";
}

function getIntersects(e) {
  let Sx = e.clientX;
  let Sy = e.clientY;
  let x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
  let y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
  let raycaster = new THREE.Raycaster();
  // 通过鼠标单击位置的标准设备坐标和相机参数计算射线投射器的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  let intersects = raycaster.intersectObjects(granaryArr);
  return intersects;
}

function weightAnimation() {
  let weightDOM = document.getElementById("weight");
  weightDOM.innerHTML = 0;
  let weightMax = messageData[chooseMesh.name]["weight"];
  let weight = 0;
  let interval = setInterval(function () {
    if (weight < weightMax) {
      weight += Math.floor(weightMax / 50); // floor向下取整
      weightDOM.innerHTML = weight;
    } else {
      weightDOM.innerHTML = weightMax;
      clearInterval(interval);
    }
  }, 5);
}

addEventListener("click", onClick); //鼠标点击事件
addEventListener("mousemove", onMouseMove); //鼠标滑动事件

export { onClick, onMouseMove };

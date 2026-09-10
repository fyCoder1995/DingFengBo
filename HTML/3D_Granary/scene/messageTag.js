import scene from "./index.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

function messageTag(domId) {
  let dom = document.getElementById(domId);
  dom.style.pointerEvents = "none"; // 避免HTML标签遮挡三维场景的鼠标事件
  let massageBox = new CSS2DObject(dom);
  return massageBox;
}

let massageBoxRenderer = new CSS2DRenderer();
massageBoxRenderer.setSize(window.innerWidth, window.innerHeight);
massageBoxRenderer.domElement.style.position = "absolute";
massageBoxRenderer.domElement.style.top = "200px";
massageBoxRenderer.domElement.style.left = "250px";
massageBoxRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(massageBoxRenderer.domElement);

let messageBox = messageTag("messageTag");
scene.add(messageBox);
export { messageBox, massageBoxRenderer };

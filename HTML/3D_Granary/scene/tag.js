import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import {
  CSS3DRenderer,
  CSS3DObject,
  CSS3DSprite,
} from "three/addons/renderers/CSS3DRenderer.js";
function tag(name) {
  let div = document.createElement("div");
  div.innerHTML = name;
  div.classList.add("tag");
  div.style.pointerEvents = "none"; // 避免HTML标签遮挡三维场景的鼠标事件
  // let tagLabel = new CSS2DObject(div);
  // let tagLabel = new CSS3DObject(div);
  let tagLabel = new CSS3DSprite(div);
  tagLabel.scale.set(0.2, 0.2, 0.2);
  tagLabel.rotateY(Math.PI / 2);
  return tagLabel;
}

// let labelRenderer = new CSS2DRenderer();
let labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.left = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

export { tag, labelRenderer };

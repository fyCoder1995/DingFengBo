import * as THREE from "three";

function createFlame() {
  let geometry = new THREE.PlaneGeometry(25, 1.6 * 25); //矩形平面
  geometry.translate(0, (1.6 * 25) / 2, 0);
  let textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load("./assets/flame.png");

  let num = 15;
  texture.repeat.set(1 / num, 1);
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide, //双面可见
    depthWrite: false, //是否对深度缓冲区有任何的影响
  });
  let mesh = new THREE.Mesh(geometry, material);
  let flame = new THREE.Group();
  let stopAnimationFrame = null;
  flame.add(
    mesh,
    mesh.clone().rotateY(Math.PI / 2),
    mesh.clone().rotateY(Math.PI / 4),
    mesh.clone().rotateY((Math.PI / 4) * 3),
  );
  let time = 0;
  function flameLoop() {
    time += 0.1;
    if (time > num) time = 0;
    texture.offset.x = Math.floor(time) / num;
    stopAnimationFrame = window.requestAnimationFrame(flameLoop);
  }
  flameLoop();

  flame.stop = function () {
    window.cancelAnimationFrame(stopAnimationFrame);
  };
  return flame;
}

export { createFlame };

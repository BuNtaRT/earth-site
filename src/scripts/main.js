import "../styles/index.css";
import load from "./scene/planet/load";
import particlesPlanet, {
  earthSize,
  endPosition,
  pointsMoveData,
  pointVectors,
  startPosition,
} from "./scene/planet/particlesPlanet";
import initialScene from "./scene/initial-scene";
import * as Three from "three";
import * as Random from "three/nodes";

const [scene, composer, controls] = initialScene();

//-------------------------- 3D Content
let mesh = await load(scene);
particlesPlanet(mesh);

//-------------------------- Update
const clock = new Three.Clock();
const calculationSinCos = {};
let delta;
const speed = 4;
const animate = () => {
  requestAnimationFrame(animate);
  if (mesh) {
    //mesh.rotation.y += 0.0005;
    const time = Date.now() * 0.0001;
    delta = clock.getDelta();

    mesh.children.forEach((child) => {
      if (child instanceof Three.Points) {
        const positions = child.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          const {
            vectorOffset,
            theta: oldTheta,
            phi: oldPhi,
          } = pointsMoveData[i];

          let theta = oldTheta + (vectorOffset.x / earthSize) * delta * speed;
          let phi = oldPhi + (vectorOffset.y / earthSize) * delta * speed;

          const x = earthSize * Math.sin(phi) * Math.sin(theta);
          const y = earthSize * Math.cos(theta);
          const z = earthSize * Math.cos(phi) * Math.sin(theta);

          pointsMoveData[i] = { vectorOffset, theta, phi };

          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = z;
        }
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
  }
  controls.update();
  // renderer.render(scene, camera);
  composer.render();
};

animate();

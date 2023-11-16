import "../styles/index.css";
import load from "./scene/planet/load";
import particlesPlanet from "./scene/planet/particlesPlanet";
import initialScene from "./scene/initial-scene";
import * as Three from "three";
import animateParticles from "./scene/planet/animateParticles";
import Stats from "stats.js";

const [scene, composer, controls] = initialScene();

//-------------------------- 3D Content
let mesh = await load(scene);
particlesPlanet(mesh);

//-------------------------- Update
const stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const animate = () => {
  requestAnimationFrame(animate);
  stats.begin();

  if (mesh) {
    mesh.children.forEach((child) => {
      if (child instanceof Three.Points) {
        animateParticles(child.geometry.attributes.position.array);
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
    controls.update();
    composer.render();
  }
  stats.end();
};

animate();

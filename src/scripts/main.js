import "../styles/index.css";
import particlesPlanet from "./scene/planet/particlesPlanet";
import initialScene from "./scene/initial-scene";
import * as Three from "three";
import animateParticles from "./scene/planet/animateParticles";
import Stats from "stats.js";
import particlesStars from "./scene/stars/particlesStars";
import loadPlanet from "./scene/planet/load";

const [scene, composer, controls] = initialScene();

//-------------------------- 3D Content
let planet = await loadPlanet(scene);
particlesPlanet(planet);
particlesStars(scene);

//-------------------------- Update
const clock = new Three.Clock();
const stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
let delta;
const planetSpeed = 0.01;

const animate = () => {
  requestAnimationFrame(animate);
  stats.begin();

  if (planet) {
    delta = clock.getDelta();

    planet.rotation.y += delta * planetSpeed;
    planet.children.forEach((child) => {
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

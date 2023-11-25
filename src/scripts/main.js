import "../styles/index.css";
import particlesPlanet from "./scene/planet/particlesPlanet";
import initialScene from "./scene/initial-scene";
import * as Three from "three";
import animateParticles from "./scene/planet/animateParticles";
import particlesStars from "./scene/stars/particlesStars";
import loadPlanet from "./scene/planet/load";
import "./utils/numberProto";

const [scene, composer, controls] = initialScene();

//-------------------------- 3D Content
let planet = await loadPlanet(scene);
particlesPlanet(planet);
particlesStars(scene);

//-------------------------- Move
scene.rotation.x = 0.5;
scene.rotation.y = 0.5;
const baseScale = 1;

document.addEventListener("mousemove", onMouseMove, false);

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
let offsetX = -0.035;
let offsetY = 0;

function onMouseMove(evt) {
  const x = evt.clientX;
  const y = evt.clientY;

  const centerScale = x - centerX - (y - centerY);

  const scale = (baseScale - centerScale * 0.00007).clamp(0.8, 1.2);

  scene.scale.x = scale;
  scene.scale.y = scale;
  scene.scale.z = scale;
  scene.rotation.x = y * 0.0003 + offsetX;
  scene.rotation.y = x * 0.0003 + offsetY;
}

//-------------------------- Update
const clock = new Three.Clock();
let delta;
const planetSpeed = 0.02;

const animate = () => {
  requestAnimationFrame(animate);
  delta = clock.getDelta();

  if (planet) {
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
};

animate();

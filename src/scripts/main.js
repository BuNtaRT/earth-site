import "../styles/index.css";
import particlesPlanet from "./scene/planet/particlesPlanet";
import initialScene from "./scene/initial-scene";
import * as Three from "three";
import animateParticles from "./scene/planet/animateParticles";
import particlesStars from "./scene/stars/particlesStars";
import loadPlanet from "./scene/planet/load";
import "./utils/numberProto";

//-------------------------- WallpaperEngine Properties
let coeffOfScale = 0.00007;
let coeffOfMove = 0.0003;
let smooth = 10;

window.wallpaperPropertyListener = {
  applyUserProperties: (properties) => {
    const { coefficientofscale, coefficientofposition, smoothcf } = properties;
    if (coefficientofscale) {
      const value = coefficientofscale.value;
      coeffOfScale = value === 0 ? 0 : value / 100000;
    }
    if (coefficientofposition) {
      const value = coefficientofposition.value;
      coeffOfMove = value === 0 ? 0 : value / 10000;
    }
    if (smoothcf) {
      const value = smoothcf.value;
      smooth = value === 0 ? 0 : value / 10;
    }
  },
};

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

let scale = 1,
  startScale = 1;
let rotationX = 0,
  startRotationX = 0;
let rotationY = 0,
  startRotationY = 0;
let progress = 1;
function onMouseMove(evt) {
  const mouseX = evt.clientX;
  const mouseY = evt.clientY;
  progress = 0;
  if (coeffOfScale) {
    startScale = scene.scale.x;
    const centerScale = mouseX - centerX - (mouseY - centerY);
    scale = (baseScale - centerScale * coeffOfScale).clamp(0.8, 1.2);
  }

  if (coeffOfMove) {
    startRotationX = scene.rotation.x;
    startRotationY = scene.rotation.y;
    rotationX = mouseY * coeffOfMove + offsetX;
    rotationY = mouseX * coeffOfMove + offsetY;
  }
}

//-------------------------- Update
const clock = new Three.Clock();
let delta;
const planetSpeed = 0.02;

const animate = () => {
  requestAnimationFrame(animate);

  delta = clock.getDelta();
  delta = delta > 0.06 ? 0.05 : delta;

  if ((coeffOfScale || coeffOfMove) && progress < 1) {
    progress += delta * smooth;
    if (coeffOfScale) {
      const lerpScale = lerp(startScale, scale, progress);
      scene.scale.x = lerpScale;
      scene.scale.y = lerpScale;
      scene.scale.z = lerpScale;
    }
    if (coeffOfMove) {
      const lerpX = lerp(startRotationX, rotationX, progress);
      const lerpY = lerp(startRotationY, rotationY, progress);
      scene.rotation.x = lerpX;
      scene.rotation.y = lerpY;
    }
  }

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

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

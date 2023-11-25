import * as Three from "three";
import postProcessing from "./render/post-processing";
import orbitControl from "./interaction/orbit-control";

function initialScene() {
  //-------------------------- Setup
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  const container = document.querySelector(".model-container");

  //-------------------------- Render
  const renderer = new Three.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  //-------------------------- Effect
  const effectComposer = postProcessing(scene, camera, renderer);

  //-------------------------- Control
  const controls = orbitControl(camera, renderer);

  function resizeCanvas() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", resizeCanvas);

  return [scene, effectComposer, controls];
}

export default initialScene;

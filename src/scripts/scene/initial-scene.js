import * as Three from "three";
import postProcessing from "./render/post-processing";
import orbitControl from "./interaction/orbit-control";

const initialScene = () => {
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

  //-------------------------- Background Image

  const particleTexture = new Three.TextureLoader().load(
    "./texture/background.webp"
  );
  particleTexture.colorSpace = Three.SRGBColorSpace;

  scene.background = particleTexture;

  //-------------------------- Render
  const renderer = new Three.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  //-------------------------- Effect
  const effectComposer = postProcessing(scene, camera, renderer);

  //-------------------------- Control
  const controls = orbitControl(camera, renderer);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return [scene, effectComposer, controls, camera];
};

export default initialScene;

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export let controls;

const orbitControl = (camera, renderer) => {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 8;
  controls.maxDistance = 25;
  controls.enableDamping = false;
  controls.enableRotate = false;
  controls.enablePan = false;
  controls.minPolarAngle = 0.8;
  controls.maxPolarAngle = 2.3;
  controls.update();

  return controls;
};

export default orbitControl;

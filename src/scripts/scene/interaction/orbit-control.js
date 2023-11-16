import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export let controls;

const orbitControl = (camera, renderer) => {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.01;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.minPolarAngle = 0.8;
  controls.maxPolarAngle = 2.3;
  controls.update();

  return controls;
};

export default orbitControl;

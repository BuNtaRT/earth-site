import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const orbitControl = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.01;
  controls.update();

  return controls;
};

export default orbitControl;

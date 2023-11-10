import * as Three from "three";

const initialLight = (scene) => {
  const ambient = new Three.DirectionalLight(0xffffff, 1);
  scene.add(ambient);
};

export default initialLight;

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loadPlanet = async (scene) => {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync("models/first/scene.gltf");
  scene.add(gltf.scene);
  gltf.scene.scale.x = 0.1;
  gltf.scene.scale.y = 0.1;
  gltf.scene.scale.z = 0.1;
  return gltf.scene;
};

export default loadPlanet;

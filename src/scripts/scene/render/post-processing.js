import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import * as Three from "three";

const postProcessing = (scene, camera, renderer) => {
  //-------------------------- Effects

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new Three.Vector2(window.innerWidth, window.innerHeight)
  );
  bloomPass.threshold = 0;
  bloomPass.strength = 0.35;
  bloomPass.radius = 0.2;

  const outputPass = new OutputPass();

  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  return composer;
};

export default postProcessing;

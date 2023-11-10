import "../styles/index.css";
import load from "./scene/planet/load";
import particlesPlanet, {
  endPosition,
  startPosition,
} from "./scene/planet/particlesPlanet";
import initialScene from "./scene/initial-scene";
import * as Three from "three";
import * as Random from "three/nodes";

const [scene, composer, controls] = initialScene();

//-------------------------- 3D Content
let mesh = await load(scene);
particlesPlanet(mesh);

//-------------------------- Update
const clock = new Three.Clock();
const speed = 0.5;
let time = 0;
const animate = () => {
  requestAnimationFrame(animate);
  if (mesh) {
    //mesh.rotation.y += 0.0005;
    const time = Date.now() * 0.0001;

    mesh.children.forEach((child) => {
      if (child instanceof Three.Points) {
        const positions = child.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          const angle = (index) => (index / 20) * Math.PI * 2;

          positions[i] = Math.sin(angle(i)) * 65;
          positions[i + 1] = Math.cos(angle(i + 1)) * 65;
          positions[i + 2] =
            Math.sin(angle(i + 2)) * Math.cos(angle(i + 2)) * 65;
          // positions[i] =
          //   65 * Math.sin(positions[i] + time) * Math.cos(positions[i] + time);
          // positions[i + 1] =
          //   65 *
          //   Math.sin(positions[i + 1] + time) *
          //   Math.sin(positions[i + 1] + time);
          // positions[i + 2] = 65 * Math.cos(positions[i + 2] + time);

          // const end = new Three.Vector3(
          //   endPosition[i],
          //   endPosition[i + 1],
          //   endPosition[i + 2]
          // );
          // const start = new Three.Vector3(
          //   startPosition[i],
          //   startPosition[i + 1],
          //   startPosition[i + 2]
          // );
          //
          // const res = new Three.Vector3().lerpVectors(
          //   start,
          //   end,
          //   Math.sin(time * Math.PI) * 0.5 + 0.5
          // );
          //
          // positions[i] += res.x;
          // positions[i + 1] += res.y;
          // positions[i + 2] += res.z;
        }
        // const positions = child.geometry.attributes.position.array;
        // const earthSize = 65;
        // for (let i = 0; i < positions.length; i += 3) {
        //   const theta = Three.MathUtils.randFloatSpread(360);
        //   const phi = Three.MathUtils.randFloatSpread(360);
        //
        //   const x = earthSize * Math.sin(theta) * Math.cos(phi);
        //   const y = earthSize * Math.sin(theta) * Math.sin(phi);
        //   const z = earthSize * Math.cos(theta);
        //
        //   positions[i] = x;
        //   positions[i + 1] = y;
        //   positions[i + 2] = z;
        //
        //   positions[i] = Three.MathUtils.lerp(positions[i], x, speed);
        //   positions[i + 1] = Three.MathUtils.lerp(positions[i + 1], y, speed);
        //   positions[i + 2] = Three.MathUtils.lerp(positions[i + 2], z, speed);
        // }

        // for (let i = 0; i < positions.length; i++) {
        //   // const earthSize = 65;
        //   //
        //   // const phi = Math.sin(time);
        //   // const theta = time;
        //   // // const theta = Three.MathUtils.randFloatSpread(360);
        //   // // const phi = Three.MathUtils.randFloatSpread(360);
        //   //
        //   // const x = earthSize * Math.sin(theta) * Math.cos(phi);
        //   // const y = earthSize * Math.sin(theta) * Math.sin(phi);
        //   // const z = earthSize * Math.cos(theta);
        //   //positions[i] += (Math.random() - 0.5) * 0.1; // Измените позиции случайным образом
        //   // positions[i] +=.set(x, y, z);
        //   //console.log(positions[i]);
        // }
        child.geometry.attributes.position.needsUpdate = true;
        // console.log(positions);
      }
    });
  }
  controls.update();

  // renderer.render(scene, camera);
  composer.render();
};

animate();

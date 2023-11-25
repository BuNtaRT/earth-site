import * as Three from "three";
import "../../utils/getRandom";

const colors = [
  { r: 1, g: 1, b: 0.569 },
  { r: 1, g: 1, b: 0.965 },
  { r: 0.961, g: 0.627, b: 0.627 },
  { r: 0.569, g: 0.639, b: 1 },
];

const particlesStars = (scene) => {
  const particleTexture = new Three.TextureLoader().load("./texture/star.png");

  const particlesCount = 5000;

  const particlesGeometry = new Three.BufferGeometry();

  const particlesPosition = new Float32Array(particlesCount * 3);
  const particlesColor = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    particlesPosition[i] = (Math.random() - 0.5) * 50;
    particlesPosition[i + 1] = (Math.random() - 0.5) * 50;
    particlesPosition[i + 2] = (Math.random() - 0.5) * 50;

    const color = colors.getRandom();
    particlesColor[i] = color.r;
    particlesColor[i + 1] = color.g;
    particlesColor[i + 2] = color.b;
  }

  particlesGeometry.setAttribute(
    "position",
    new Three.BufferAttribute(particlesPosition, 3)
  );
  particlesGeometry.setAttribute(
    "color",
    new Three.BufferAttribute(particlesColor, 3)
  );

  const starMaterial = new Three.PointsMaterial({
    size: 0.035,
    map: particleTexture,
    transparent: true,
    blending: Three.AdditiveBlending,
    vertexColors: true,
  });

  const starMesh = new Three.Points(particlesGeometry, starMaterial);

  scene.add(starMesh);

  return starMesh;
};

export default particlesStars;

import * as Three from "three";

const particlesStars = (scene) => {
  const particleTexture = new Three.TextureLoader().load("./texture/star.png");

  const particlesCount = 5000;

  const particlesPositions = particlesCount * 3;
  const particlesGeometry = new Three.BufferGeometry();

  const particlesPosition = new Float32Array(particlesPositions);

  for (let i = 0; i < particlesPositions; i++) {
    particlesPosition[i] = (Math.random() - 0.5) * 50;
  }

  particlesGeometry.setAttribute(
    "position",
    new Three.BufferAttribute(particlesPosition, 3)
  );

  const starMaterial = new Three.PointsMaterial({
    size: 0.025,
    map: particleTexture,
    transparent: true,
    blending: Three.AdditiveBlending,
  });

  const starMesh = new Three.Points(particlesGeometry, starMaterial);

  scene.add(starMesh);

  return starMesh;
};

export default particlesStars;

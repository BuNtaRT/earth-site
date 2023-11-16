import * as Three from "three";

export const pointsMoveData = [];
export const earthSize = 65;

const particlesPlanet = (planet) => {
  const sprite = new Three.TextureLoader().load("texture/star.png");

  const particles = new Three.BufferGeometry();
  const particlesCount = 2000;

  const positionPoints = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    let theta = Three.MathUtils.randFloatSpread(360);
    let phi = Three.MathUtils.randFloatSpread(360);

    const iPos = i * 3;

    const x = earthSize * Math.sin(theta) * Math.cos(phi);
    const y = earthSize * Math.sin(theta) * Math.sin(phi);
    const z = earthSize * Math.cos(theta);

    positionPoints[iPos] = x;
    positionPoints[iPos + 1] = y;
    positionPoints[iPos + 2] = z;

    pointsMoveData[iPos] = { theta, phi };
  }

  particles.setAttribute(
    "position",
    new Three.BufferAttribute(positionPoints, 3)
  );

  const particlesMaterial = new Three.PointsMaterial({
    size: 0.02,
    map: sprite,
    transparent: true,
    blending: Three.AdditiveBlending,
  });
  const particlesMesh = new Three.Points(particles, particlesMaterial);

  planet.add(particlesMesh);
  console.log(planet);
};

export default particlesPlanet;

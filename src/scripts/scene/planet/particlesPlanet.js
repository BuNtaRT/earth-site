import * as Three from "three";

export const pointsMoveData = [];
export const earthSize = 65;

const colors = [
  { r: 0.475, g: 0.294, b: 0.518 },
  { r: 0.988, g: 0.596, b: 0.686 },
  { r: 1, g: 0.812, b: 0.404 },
  { r: 0.996, g: 0.937, b: 0.945 },
  { r: 0.835, g: 0.459, b: 0.745 },
  { r: 1, g: 0.745, b: 0.576 },
];

const particlesPlanet = (planet) => {
  const sprite = new Three.TextureLoader().load("texture/star.png");

  const particles = new Three.BufferGeometry();
  const particlesCount = 4000;

  const positionPoints = new Float32Array(particlesCount * 3);
  const particlesColor = new Float32Array(particlesCount * 3);

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

    const color = colors.getRandom();
    particlesColor[i] = color.r;
    particlesColor[i + 1] = color.g;
    particlesColor[i + 2] = color.b;

    pointsMoveData[iPos] = { theta, phi };
  }

  particles.setAttribute(
    "position",
    new Three.BufferAttribute(positionPoints, 3)
  );
  particles.setAttribute("color", new Three.BufferAttribute(particlesColor, 3));

  const particlesMaterial = new Three.PointsMaterial({
    size: 0.025,
    map: sprite,
    transparent: true,
    blending: Three.AdditiveBlending,
    vertexColors: true,
  });
  const particlesMesh = new Three.Points(particles, particlesMaterial);

  planet.add(particlesMesh);
};

export default particlesPlanet;

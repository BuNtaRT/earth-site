import { earthSize, pointsMoveData } from "./particlesPlanet";

const speed = 0.00058;
const skipFrameCount = 2;
const batchSize = 1;

let currentlyBatch = 0;
let skipFrame = 2;

const animateParticles = (points) => {
  if (skipFrame <= 0) {
    const size = points.length / batchSize;

    animatePoints(currentlyBatch * size, size, points);
    //animatePoints(0, points.length, points);

    currentlyBatch = currentlyBatch === batchSize - 1 ? 0 : currentlyBatch + 1;
    skipFrame = skipFrameCount;
  } else {
    skipFrame--;
  }
};

const animatePoints = (startIndex, count, points) => {
  const end = startIndex + count;
  for (let i = 0; i < end; i += 3) {
    if (pointsMoveData[i]) {
      const { theta: oldTheta, phi: oldPhi } = pointsMoveData[i];

      let theta = oldTheta + speed;
      let phi = oldPhi + speed;

      const x = earthSize * Math.sin(phi) * Math.sin(theta);
      const y = earthSize * Math.cos(theta);
      const z = earthSize * Math.cos(phi) * Math.sin(theta);

      pointsMoveData[i] = { theta, phi };

      points[i] = x;
      points[i + 1] = y;
      points[i + 2] = z;
    }
  }
};

export default animateParticles;

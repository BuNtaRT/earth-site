export const getRandomFloat = (min, max) => {
  return (Math.random() * (min - max) + max).toFixed(4);
};

Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
};

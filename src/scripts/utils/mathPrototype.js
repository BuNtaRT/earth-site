/**
 * Ограничение числа минимальным и максимальным значением
 * @param {Number} min Минимальное значение числа
 * @param {Number} max Максимальное значение числа
 * @returns A число в диапазоне [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

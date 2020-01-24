module.exports = function round(num, length) {
  return ((num * length) | 0) / length;
}
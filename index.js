/**
 * Pandemonium Library Endpoint
 * =============================
 *
 * Exporting the library's functions.
 */
module.exports = {
  choice: require('./choice.js'),
  dangerousButPerformantSample: require('./dangerous-but-performant-sample.js'),
  naiveSample: require('./naive-sample.js'),
  random: require('./random.js'),
  randomIndex: require('./random-index.js'),
  sample: require('./sample.js'),
  shuffle: require('./shuffle.js'),
  shuffleInPlace: require('./shuffle-in-place.js')
};

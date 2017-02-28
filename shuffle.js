/**
 * Pandemonium Shuffle
 * ====================
 *
 * Shuffle function which is basically just applying the Fisher-Yates sampling
 * function over the whole array.
 */
var createSample = require('./sample.js').createSample;

/**
 * Creating a function returning the given array shuffled.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createShuffle(rng) {
  var customSample = createSample(rng);

  /**
   * Function returning the shuffled array.
   *
   * @param  {array}  sequence - Target sequence.
   * @return {array}           - The shuffled sequence.
   */
  return function(sequence) {
    return customSample(sequence.length, sequence);
  };
}

/**
 * Default shuffle using `Math.random`.
 */
var shuffle = createShuffle(Math.random);

/**
 * Exporting.
 */
shuffle.createShuffle = createShuffle;
module.exports = shuffle;

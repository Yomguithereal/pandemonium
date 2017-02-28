/**
 * Pandemonium Random Index
 * =========================
 *
 * Random index function.
 */
var createRandom = require('./random.js').createRandom;

/**
 * Creating a function returning a random index from the given array.
 *
 * @param  {function} rng - RNG function returning uniform random.
 * @return {function}     - The created function.
 */
function createRandomIndex(rng) {
  var customRandom = createRandom(rng);

  /**
   * Random function.
   *
   * @param  {array}  array - Target array.
   * @return {number}
   */
  return function(array) {
    return customRandom(0, array.length - 1);
  };
}

/**
 * Default random using `Math.random`.
 */
var randomIndex = createRandomIndex(Math.random);

/**
 * Exporting.
 */
randomIndex.createRandomIndex = createRandomIndex;
module.exports = randomIndex;

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
   * @param  {array|number}  array - Target array or length of the array.
   * @return {number}
   */
  return function(length) {
    if (typeof length !== 'number')
      length = length.length;

    return customRandom(0, length - 1);
  };
}

/**
 * Default random index using `Math.random`.
 */
var randomIndex = createRandomIndex(Math.random);

/**
 * Exporting.
 */
randomIndex.createRandomIndex = createRandomIndex;
module.exports = randomIndex;

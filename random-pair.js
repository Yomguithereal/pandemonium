/**
 * Pandemonium Random Pair
 * =========================
 *
 * Random pair function.
 */
var utils = require('./utils.js');

/**
 * Creating a function returning a random pair of the given array.
 *
 * @param  {function} rng - RNG function returning uniform random.
 * @return {function}     - The created function.
 */
function createRandomPair(rng) {
  /**
   * Random pair function.
   *
   * @param  {array|number}  array - Target array or length of the array.
   * @return {number}
   */
  return function (array) {
    var needItems = typeof array !== 'number';

    var n = needItems ? array.length : array;

    if (n < 2)
      throw new Error(
        'pandemonium/random-pair: cannot draw a random pair for length < 2.'
      );

    var t = utils.triuLinearLength(n);
    var k = Math.floor(rng() * t);

    var coords = utils.linearIndexToTriuCoords(n, k);

    if (needItems) return [array[coords[0]], array[coords[1]]];

    return coords;
  };
}

/**
 * Default random index using `Math.random`.
 */
var randomPair = createRandomPair(Math.random);

/**
 * Exporting.
 */
randomPair.createRandomPair = createRandomPair;
module.exports = randomPair;

/**
 * Pandemonium Naive Sample
 * =========================
 *
 * Naive sampling function storing the already picked values in a Set.
 * Performance of this function will decrease dramatically when `k` is a
 * high proportion of `n`.
 */
var createRandomIndex = require('./random-index.js').createRandomIndex;

/**
 * Creating a function returning a sample of size n using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createNaiveSample(rng) {
  var customRandomIndex = createRandomIndex(rng);

  /**
   * Function returning sample of size n from array.
   *
   * @param  {number} n              - Size of the sample.
   * @param  {array|number} sequence - Target sequence or its length.
   * @return {array}                 - The random sample.
   */
  return function(n, sequence) {
    if (n >= sequence.length)
      return sequence.slice();

    var items = new Set(),
        array = new Array(n),
        size = 0,
        index;

    var needItems = typeof sequence !== 'number',
        i = 0;

    while (items.size < n) {
      index = customRandomIndex(sequence);

      items.add(index);

      if (items.size > size) {
        array[i++] = needItems ? sequence[index] : index;
        size = items.size;
      }
    }

    return array;
  };
}

/**
 * Default naive sample using `Math.random`.
 */
var naiveSample = createNaiveSample(Math.random);

/**
 * Exporting.
 */
naiveSample.createNaiveSample = createNaiveSample;
module.exports = naiveSample;

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
   * @param  {number} n        - Size of the sample.
   * @param  {array}  sequence - Target sequence.
   * @return {array}           - The random sample.
   */
  return function(n, sequence) {
    var items = new Set();

    while (items.size < n)
      items.add(customRandomIndex(sequence));

    var array = new Array();

    items.forEach(function(index) {
      array.push(sequence[index]);
    });

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

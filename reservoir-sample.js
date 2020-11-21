/**
 * Pandemonium Reservoir Sample
 * =============================
 *
 * Reservoir sampling function.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Reservoir_sampling#Simple_algorithm
 */
var createRandomIndex = require('./random-index.js').createRandomIndex;

/**
 * Creating a function returning a sample of size n using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createReservoirSample(rng) {
  var customRandomIndex = createRandomIndex(rng);

  /**
   * Function returning sample of size n from array.
   *
   * @param  {number} k              - Size of the sample.
   * @param  {array|number} sequence - Target sequence or its length.
   * @return {array}                 - The random sample.
   */
  return function(k, sequence) {
    var n = sequence.length;

    // Sample size gte sequence's length
    if (k >= n)
      return sequence.slice();

    var sample = new Array(k);
    var i, j;

    for (i = 0; i < k; i++)
      sample[i] = sequence[i];

    for (; i < n; i++) {
      j = customRandomIndex(i);

      if (j < k)
        sample[j] = sequence[i];
    }

    return sample;
  };
}

/**
 * Default reservoir sample using `Math.random`.
 */
var reservoirSample = createReservoirSample(Math.random);

/**
 * Exporting.
 */
reservoirSample.createReservoirSample = createReservoirSample;
module.exports = reservoirSample;

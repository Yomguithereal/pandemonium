/**
 * Pandemonium Geometric Reservoir Sample
 * =======================================
 *
 * Reservoir sampling function using "Algorithm L".
 *
 * [Reference]:
 * Li, Kim-Hung. "Reservoir-sampling algorithms of time complexity
 * O(n (1+ log (N/n)))." ACM Transactions on Mathematical Software (TOMS) 20.4
 * (1994): 481-493.
 *
 * https://en.wikipedia.org/wiki/Reservoir_sampling#An_optimal_algorithm
 */
var createRandomIndex = require('./random-index.js').createRandomIndex;

var exp = Math.exp;
var log = Math.log;
var floor = Math.floor;

/**
 * Creating a function returning a sample of size n using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createGeometricReservoirSample(rng) {
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
    var i = 0;

    for (; i < k; i++)
      sample[i] = sequence[i];

    // NOTE: from this point, formulae consider i to be 1-based
    var w = exp(log(rng()) / k);

    while (i <= n) {
      i += floor(log(rng()) / log(1 - w)) + 1;

      if (i <= n) {
        sample[customRandomIndex(k)] = sequence[i - 1];
        w *= exp(log(rng()) / k);
      }
    }

    return sample;
  };
}

/**
 * Default reservoir sample using `Math.random`.
 */
var geometricReservoirSample = createGeometricReservoirSample(Math.random);

/**
 * Exporting.
 */
geometricReservoirSample.createGeometricReservoirSample = createGeometricReservoirSample;
module.exports = geometricReservoirSample;

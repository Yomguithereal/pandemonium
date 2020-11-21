/**
 * Pandemonium Fisher-Yates Sample
 * ================================
 *
 * Sample function using `k` iterations of the Fisher-Yates over a copy of the
 * provided array.
 */
var createRandom = require('./random.js').createRandom;

/**
 * Creating a function returning a sample of size n using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createFisherYatesSample(rng) {
  var customRandom = createRandom(rng);

  /**
   * Function returning sample of size n from array.
   *
   * @param  {number} n        - Size of the sample.
   * @param  {array}  sequence - Target sequence.
   * @return {array}           - The random sample.
   */
  return function(n, sequence) {
    var result = sequence.slice(),
        lastIndex = result.length - 1;

    if (n >= sequence.length)
      return result;

    var index = -1;

    while (++index < n) {
      var r = customRandom(index, lastIndex),
          value = result[r];

      result[r] = result[index];
      result[index] = value;
    }

    // Clamping the array
    result.length = n;

    return result;
  };
}

/**
 * Default sample using `Math.random`.
 */
var fisherYatesSample = createFisherYatesSample(Math.random);

/**
 * Exporting.
 */
fisherYatesSample.createFisherYatesSample = createFisherYatesSample;
module.exports = fisherYatesSample;

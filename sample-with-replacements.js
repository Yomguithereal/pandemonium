/**
 * Pandemonium Sample With Replacements
 * =====================================
 *
 * Straightforward sampling function that allows an item to exist multiple
 * times in the resulting sample.
 */
var createRandomIndex = require('./random-index.js').createRandomIndex;

/**
 * Creating a function returning a sample of size n with replacements
 * using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createSampleWithReplacements(rng) {
  var customRandomIndex = createRandomIndex(rng);

  /**
   * Function returning sample of size n from array with replacements.
   *
   * @param  {number} n        - Size of the sample.
   * @param  {array}  sequence - Target sequence.
   * @return {array}           - The random sample.
   */
  return function(n, sequence) {
    var sample = new Array(n),
        i;

    for (i = 0; i < n; i++)
      sample[i] = customRandomIndex(sequence);

    return sample;
  };
}

/**
 * Default sample with replacements using `Math.random`.
 */
var sampleWithReplacements = createSampleWithReplacements(Math.random);

/**
 * Exporting.
 */
sampleWithReplacements.createSampleWithReplacements = createSampleWithReplacements;
module.exports = sampleWithReplacements;

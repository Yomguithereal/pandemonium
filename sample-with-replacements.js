/**
 * Pandemonium Sample With Replacements
 * =====================================
 *
 * Straightforward sampling function that allows an item to exist multiple
 * times in the resulting sample.
 */
var createRandom = require('./random.js').createRandom;

/**
 * Creating a function returning a sample of size k with replacements
 * using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createSampleWithReplacements(rng) {
  var customRandom = createRandom(rng);

  /**
   * Function returning sample of size k from array with replacements.
   *
   * @param  {number} k        - Size of the sample.
   * @param  {array}  sequence - Target sequence.
   * @return {array}           - The random sample.
   */
  return function (k, sequence) {
    var sample = new Array(k),
      m = sequence.length - 1,
      i,
      r;

    for (i = 0; i < k; i++) {
      r = customRandom(0, m);
      sample[i] = sequence[r];
    }

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
sampleWithReplacements.createSampleWithReplacements =
  createSampleWithReplacements;
module.exports = sampleWithReplacements;

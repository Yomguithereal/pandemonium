/**
 * Pandemonium Dangerous But Performant Sample
 * ============================================
 *
 * Performant sampling function running in O(k) memory & time but mutating the
 * given array before reversing the mutations at the end of the process.
 */
var createRandom = require('./random.js').createRandom;

/**
 * Creating a function returning a sample of size n using the provided RNG.
 *
 * @param  {function} rng - The RNG to use.
 * @return {function}     - The created function.
 */
function createDangerousButPerformantSample(rng) {
  var customRandom = createRandom(rng);

  /**
   * Function returning sample of size n from array.
   *
   * @param  {number} n        - Size of the sample.
   * @param  {array}  sequence - Target sequence.
   * @return {array}           - The random sample.
   */
  return function(n, sequence) {
    var result = new Array(n),
        swaps = new Array(n),
        lastIndex = sequence.length - 1;

    var index = -1,
        value,
        swap,
        r;

    while (++index < n) {
      r = customRandom(index, lastIndex);
      value = sequence[r];

      sequence[r] = sequence[index];
      sequence[index] = value;
      result[index] = value;

      // Storing the swap so we can reverse it
      swaps[index] = r;
    }

    // Reversing the mutations
    while (--index >= 0) {
      swap = swaps[index];
      value = sequence[index];

      sequence[index] = sequence[swap];
      sequence[swap] = value;
    }

    return result;
  };
}

/**
 * Default dangerous sample using `Math.random`.
 */
var dangerousButPerformantSample = createDangerousButPerformantSample(Math.random);

/**
 * Exporting.
 */
dangerousButPerformantSample.createDangerousButPerformantSample = createDangerousButPerformantSample;
module.exports = dangerousButPerformantSample;

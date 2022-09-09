/**
 * Pandemonium Cycle Walking Functions
 * ====================================
 *
 * Functions related to hash cycle walking tricks use to generated good enough
 * permutations in constant memory and a single PRNG call.
 *
 * [Urls]:
 * https://afnan.io/posts/2019-04-05-explaining-the-hashed-permutation/
 * https://graphics.pixar.com/library/MultiJitteredSampling/paper.pdf
 *
 * [Reference]:
 * Correlated Multi-Jittered Sampling. Andrew Kensler. Pixar Technical Memo
 * 13-01. March 5, 2013.
 */

/**
 * Constants.
 */
var MAX_UINT32 = Math.pow(2, 32) - 1;

/**
 * Function permuting the given index.
 *
 * @note This function works on 32 bits unsigned integers. This might do strange
 * stuff in JavaScript when using negative numbers or close to the 31 bits
 * range.
 *
 * @param  {number} i - The index to permute.
 * @param  {number} l - Size of the permutation vector.
 * @param  {number} p - Seed of the shuffle.
 * @return {number}   - The permuted index.
 */
function permute(i, l, p) {
  // Coercion to closest power of two
  var w = l - 1;
  w |= w >> 1;
  w |= w >> 2;
  w |= w >> 4;
  w |= w >> 8;
  w |= w >> 16;

  // Cycle walking
  do {
    // Hashing
    i ^= p;
    i *= 0xe170893d;
    i ^= p >> 16;
    i ^= (i & w) >> 4;
    i ^= p >> 8;
    i *= 0x0929eb3f;
    i ^= p >> 23;
    i ^= (i & w) >> 1;
    i *= 1 | (p >> 27);
    i *= 0x6935fa69;
    i ^= (i & w) >> 11;
    i *= 0x74dcb303;
    i ^= (i & w) >> 2;
    i *= 0x9e501cc3;
    i ^= (i & w) >> 2;
    i *= 0xc860a3df;
    i &= w;
    i ^= i >> 5;
  } while (i >= l);

  return (i + p) % l;
}

function createPermutation(l, seed) {
  if (Array.isArray(l)) {
    l = l.length;
  }

  if (l > MAX_UINT32) {
    throw new Error(
      'pandemonium/cycle-walking: length should be <= 4294967295 (max uint32 number).'
    );
  }

  var i = 0;
  seed >>>= 0; // Coercion to 32 bits
  l >>>= 0; // Might do some strange stuff to very large arrays.

  return function () {
    return permute(i++, l, seed);
  };
}

/**
 * Exporting.
 */
exports.permute = permute;
exports.createPermutation = createPermutation;

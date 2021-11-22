/**
 * Pandemonium Utils
 * ==================
 *
 * Miscellaneous helper functions.
 */

/**
 * Function returning an array of indices.
 *
 * @param  {number} n - Length of the array to create.
 * @return {Array}    - The created array.
 */
exports.indices = function (n) {
  var a = new Array(n);
  var i;

  for (i = 0; i < n; i++) {
    a[i] = i;
  }

  return a;
};

/**
 * Function returning the coordinates in an upper triangular square matrix
 * for the given linear index (we don't consider the diagonal).
 *
 * [Reference]: https://stackoverflow.com/questions/27086195/linear-index-upper-triangular-matrix
 *
 * @param  {number} k - Linear index to convert to coordinates.
 * @return {Array}    - Coordinates pair.
 */
exports.linearIndexToTriuCoords = function (n, k) {
  var i = n - 2 - Math.floor(Math.sqrt(-8 * k + 4 * n * (n - 1) - 7) / 2 - 0.5);
  var j = k + i + 1 - (n * (n - 1)) / 2 + ((n - i) * (n - i - 1)) / 2;

  return [i, j];
};

exports.triuCoordsToLinearIndex = function (n, i, j) {
  return (n * (n - 1)) / 2 - ((n - i) * (n - i - 1)) / 2 + j - i - 1;
};

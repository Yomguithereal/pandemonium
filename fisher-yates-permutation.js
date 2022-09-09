/**
 * Pandemonium Fisher-Yates Permutation
 * =====================================
 *
 * Helper class that can be used to cycle through Fisher-Yates permutations
 * using a convenient interface.
 */
var typed = require('mnemonist/utils/typed-arrays');

function FisherYatesPermutation(length, rng) {
  var PointerArray = typed.PointerArray(length);

  this.length = length;
  this.indices = new PointerArray(length);
  this.state = -1;
  this.rng = rng;

  for (var i = 0; i < length; i++) {
    this.indices[i] = i;
  }
}

FisherYatesPermutation.prototype.permute = function () {
  this.state++;
};

exports.FisherYatesPermutation = FisherYatesPermutation;

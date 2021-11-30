var randomOrderedPair = require('../random-ordered-pair.js');
var utils = require('../utils.js');

/**
 * Helpers.
 */
function hashPair(pair) {
  return pair[0] + ',' + pair[1];
}

/**
 * Functions.
 */
function sampleOrderedPairsNaive(n, k) {
  var alreadySeen = new Set();
  var pairs = new Array(k);

  var i = 0;
  var candidate, key;

  while (i !== k) {
    var candidate = randomOrderedPair(n);
    var key = candidate[0] * n + candidate[1];

    if (alreadySeen.has(key)) continue;

    alreadySeen.add(key);
    pairs[i++] = candidate;
  }

  return pairs;
}

/**
 * Benchmark.
 */
function bench(fn) {
  // var MultiSet = require('mnemonist/multi-set');
  // var set = new MultiSet();

  var name = fn.name;
  var pairs;

  var T = 100000;
  var N = 200000;
  // var N = 5;
  var P = 500;
  // var P = 5;

  console.time(name);
  for (var i = 0; i < T; i++) {
    pairs = fn(N, P);
    // pairs.forEach(pair => set.add(hashPair(pair)));
  }
  console.timeEnd(name);

  // console.log(set, set.dimension);
}

console.log('\nOrdered');
bench(sampleOrderedPairsNaive);

console.log('\nUnordered');

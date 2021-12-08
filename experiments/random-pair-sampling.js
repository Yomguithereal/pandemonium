var randomOrderedPair = require('../random-ordered-pair.js');
var randomPair = require('../random-pair.js');
var utils = require('../utils.js');
var lib = require('../');

var {exp, log, floor} = Math;

/**
 * Helpers.
 */
function hashPair(pair) {
  return pair[0] + ',' + pair[1];
}

/**
 * Functions.
 */
function sampleUnorderedPairsNaive(n, k) {
  var alreadySeen = new Set();
  var pairs = new Array(k);

  var i = 0;
  var candidate, key;

  while (i !== k) {
    var candidate = randomPair(n);
    var key = candidate[0] * n + candidate[1];

    if (alreadySeen.has(key)) continue;

    alreadySeen.add(key);
    pairs[i++] = candidate;
  }

  return pairs;
}

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

function sampleUnorderedPairsGeometric(l, k) {
  var n = utils.triuLinearLength(l);
  var sample = new Array(k);
  var i;

  for (i = 0; i < k; i++) sample[i] = utils.linearIndexToTriuCoordsFast(i);

  // NOTE: from this point, formulae consider i to be 1-based
  var w = exp(log(Math.random()) / k);

  if (i > n) return sample;

  while (true) {
    i += floor(log(Math.random()) / log(1 - w)) + 1;

    if (i <= n) {
      sample[floor(k * Math.random())] = utils.linearIndexToTriuCoords(i - 1);
      w *= exp(log(Math.random()) / k);
    } else {
      break;
    }
  }

  return sample;
}

/**
 * Benchmark.
 */
function bench(fn, name) {
  // var MultiSet = require('mnemonist/multi-set');
  // var set = new MultiSet();

  if (!name) name = fn.name;

  var pairs;

  var T = 100000;

  var N = 20000;
  var P = 500;

  // var N = 5;
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
bench((a1, a2) => lib.sampleOrderedPairs(a2, a1), 'lib');

console.log('\nUnordered');
bench(sampleUnorderedPairsNaive);
bench(sampleUnorderedPairsGeometric);
bench((a1, a2) => lib.samplePairs(a2, a1), 'lib');

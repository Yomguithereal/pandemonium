var utils = require('../utils');

/**
 * Helpers.
 */
function derive(n, i) {
  var k = 1 + Math.floor(Math.random() * (n - 1));
  var j = (i + k) % n;

  return j;
}

function swapPair(pair) {
  var tmp = pair[0];
  pair[0] = pair[1];
  pair[1] = tmp;
}

function hashPair(pair) {
  return pair[0] + ',' + pair[1];
}

/**
 * Functions.
 */
function randomOrderedPairByDerivation(n) {
  var i = Math.floor(Math.random() * n);
  var k = 1 + Math.floor(Math.random() * (n - 1));
  var j = (i + k) % n;

  return [i, j];
}

function randomUnorderedPairByDerivation(n) {
  var c = randomOrderedPairByDerivation(n);

  if (c[0] > c[1]) swapPair(c);

  return c;
}

function randomUnorderedPairTriu(n) {
  const L = utils.triuLinearLength(n);

  return utils.linearIndexToTriuCoordsFast(Math.floor(Math.random() * L));
}

function randomOrderedPairTriu(n) {
  var c = randomUnorderedPairTriu(n);

  if (Math.random() < 0.5) swapPair(c);

  return c;
}

function randomOrderedPairNaive(n) {
  var i = Math.floor(Math.random() * n);

  var j;

  do {
    j = Math.floor(Math.random() * n);
  } while (i === j);

  return [i, j];
}

function randomUnorderedPairNaive(n) {
  var c = randomOrderedPairNaive(n);

  if (c[0] > c[1]) swapPair(c);

  return c;
}

/**
 * Benchmark.
 */
function bench(fn) {
  var name = fn.name;
  var pair;

  var T = 100000000;
  var N = 20000;

  console.time(name);
  for (var i = 0; i < T; i++) {
    pair = fn(N);
  }
  console.timeEnd(name);
}

console.log('\nOrdered');
bench(randomOrderedPairByDerivation);
bench(randomOrderedPairTriu);
bench(randomOrderedPairNaive);

console.log('\nUnordered');
bench(randomUnorderedPairByDerivation);
bench(randomUnorderedPairTriu);
bench(randomUnorderedPairNaive);

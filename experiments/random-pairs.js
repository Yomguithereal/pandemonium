var MultiSet = require('mnemonist/multi-set');
var sampling = require('../geometric-reservoir-sample');

function derive(n, i) {
  var k = 1 + Math.floor(Math.random() * (n - 1));
  var j = (i + k) % n;

  return j;
}

function randomOrderedPair(n) {
  var i = Math.floor(Math.random() * n);
  var k = 1 + Math.floor(Math.random() * (n - 1));
  var j = (i + k) % n;

  return [i, j];
}

function randomUnorderedPair(n) {
  var c = randomOrderedPair(n);

  if (c[0] > c[1]) return [c[1], c[0]]; // Swap for perf

  return c;
}

function hashPair(pair) {
  return pair[0] + ',' + pair[1];
}

// var N = 10000000;

// var set = new MultiSet();

// for (var t = 0; t < N; t++) set.add(hashPair(randomUnorderedPair(5)));

// console.log(set);
// console.log(set.dimension);

var N = 1000000;

var set = new MultiSet();

for (var t = 0; t < N; t++) {
  sampling(4, 5).forEach(function (i) {
    set.add(hashPair([i, derive(5, i)]));
  });
}

console.log(set);
console.log(set.dimension);

// TODO: how to sample more pairs than n?

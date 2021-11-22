var MultiSet = require('mnemonist/multi-set');

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

var N = 10000000;

var set = new MultiSet();

for (var n = 0; n < N; n++) set.add(hashPair(randomUnorderedPair(5)));

console.log(set);
console.log(set.dimension);

var FisherYatesPermutation =
  require('../fisher-yates-permutation').FisherYatesPermutation;
var MultiSet = require('mnemonist/multi-set');

function factorial(n) {
  if (n === 1) return n;
  return n * factorial(n - 1);
}

var N = 8;

console.log('N  =', N);
console.log('N! =', factorial(N));

var p = new FisherYatesPermutation(N);

var RUNS = factorial(N) * 10;

var stats = new MultiSet();

for (var i = 0; i < RUNS; i++) {
  p.reset();

  var r = new Array(N);

  for (var j = 0; j < N; j++) {
    r[j] = p.permute();
  }

  stats.add(r.join(','));
}

console.log('P  =', stats.dimension);
console.log('S  =', stats.top(10));

N -= 2;

console.log();
console.log('shrinking to ', N);
console.log('N  =', N);
console.log('N! =', factorial(N));

p.shrinkAndReset(N);

RUNS = factorial(N) * 10;

stats = new MultiSet();

for (var i = 0; i < RUNS; i++) {
  p.reset();

  var r = new Array(N);

  for (var j = 0; j < N; j++) {
    r[j] = p.permute();
  }

  stats.add(r.join(','));
}

console.log('P  =', stats.dimension);
console.log('S  =', stats.top(10));

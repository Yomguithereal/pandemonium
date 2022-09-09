var cycleWalking = require('../cycle-walking.js');
var randomIndex = require('../random-index.js');

var MAX_UINT32 = Math.pow(2, 32) - 1;

var createSeed = () => randomIndex(MAX_UINT32);

function factorial(n) {
  if (n === 1) return n;
  return n * factorial(n - 1);
}

console.log('7! =', factorial(7));

var N = 7;
var i;
var seed = createSeed();
console.log('seed =', seed);
var next = cycleWalking.createPermutation(N, seed);

for (i = 0; i < N; i++) console.log(next());

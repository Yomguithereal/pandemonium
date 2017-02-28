/**
 * Pandemonium Library Unit Tests
 * ===============================
 */
var assert = require('assert'),
    seedrandom = require('seedrandom');

var lib = require('./');

var rng = function() {
  return seedrandom('shawarma');
};

var vec = function(size, fill) {
  var array = new Array(size);

  for (var i = 0; i < size; i++)
    array[i] = fill;

  return array;
};

describe('#.createRandom', function() {
  var createRandom = lib.random.createRandom;

  it('should be possible to create a random function using supplied rng.', function() {
    var random = createRandom(rng());

    var numbers = vec(10, 0).map(function() {
      return random(1, 3);
    });

    assert.deepEqual(numbers, [2, 1, 1, 2, 2, 1, 2, 3, 2, 3]);
  });
});

describe('#.createRandomIndex', function() {
  var createRandomIndex = lib.randomIndex.createRandomIndex;

  it('should be possible to create a random index function using the supplied rng.', function() {
    var randomIndex = createRandomIndex(rng());

    var fruits = ['apple', 'pear', 'orange'];

    var tests = vec(10, 0).map(function() {
      return randomIndex(fruits);
    });

    assert.deepEqual(tests, [1, 0, 0, 1, 1, 0, 1, 2, 1, 2]);
  });
});

describe('#.createChoice', function() {
  var createChoice = lib.choice.createChoice;

  it('should be possible to create a choice function using the supplied rng.', function() {
    var choice = createChoice(rng());

    var fruits = ['apple', 'pear', 'orange'];

    var tests = vec(10, 0).map(function() {
      return choice(fruits);
    });

    assert.deepEqual(tests, [1, 0, 0, 1, 1, 0, 1, 2, 1, 2].map(function(index) {
      return fruits[index];
    }));
  });
});

// describe('#.createSample', function() {
//   var data = [13, 14, 15, 8, 20];

//   it('should be possible to create a sample function using the supplied rng.', function() {
//     var sample = createSample(rng());

//     var tests = vec(5, 0).map(() => sample(2, data));
//     assert.deepEqual(tests, [[14, 13], [14, 15], [15, 13], [15, 8], [14, 20]]);
//   });
// });

// describe('#.createShuffle', function() {
//   it('should be possible to create a shuffle function using the supplied rng.', function() {
//     var shuffle = createShuffle(rng());

//     var shuffled = shuffle([1, 2, 3, 4, 5]);
//     assert.deepEqual(shuffled, [2, 1, 3, 4, 5]);
//   });
// });

// describe('#.weightedRandomIndex', function() {
//   it('should return a number superior to zero and within the range of the list.', function() {
//     var randomIndex = weightedRandomIndex([2 / 3, 1 / 6, 1 / 6]);
//     assert(randomIndex >= 0 && randomIndex < 3);
//   });
// });

// describe('#.createDangerousButPerformantSample', function() {
//   var data = [13, 14, 15, 8, 20],
//       copy = data.slice();

//   it('should be possible to create a sample function using the supplied rng.', function() {
//     var sample = createDangerousButPerformantSample(rng());

//     var tests = vec(7, 0).map(() => sample(2, data));

//     assert.deepEqual(tests, [[14, 13], [14, 15], [15, 13], [15, 8], [14, 20], [8, 13], [20, 13]]);

//     // Ensuring the state of the array did not change
//     assert.deepEqual(copy, data);
//   });
// });

// describe('#.createShuffleInPlace', function() {
//   it('should be possible to create a shuffle in place function using the supplied rng.', function() {
//     var shuffle = createShuffleInPlace(rng()),
//         array = [1, 2, 3, 4, 5];

//     shuffle(array);
//     assert.deepEqual(array, [2, 1, 3, 4, 5]);
//   });
// });

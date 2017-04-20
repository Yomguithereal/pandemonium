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

describe('#.createSample', function() {
  var createSample = lib.sample.createSample;

  var data = [13, 14, 15, 8, 20];

  it('should be possible to create a sample function using the supplied rng.', function() {
    var sample = createSample(rng());

    var tests = vec(5, 0).map(function() {
      return sample(2, data);
    });

    assert.deepEqual(tests, [[14, 13], [14, 15], [15, 13], [15, 8], [14, 20]]);
  });
});

describe('#.createShuffle', function() {
  var createShuffle = lib.shuffle.createShuffle;

  it('should be possible to create a shuffle function using the supplied rng.', function() {
    var shuffle = createShuffle(rng());

    var shuffled = shuffle([1, 2, 3, 4, 5]);
    assert.deepEqual(shuffled, [2, 1, 3, 4, 5]);
  });
});

describe('#.createDangerousButPerformantSample', function() {
  var createDangerousButPerformantSample = lib.dangerousButPerformantSample.createDangerousButPerformantSample;

  var data = [13, 14, 15, 8, 20],
      copy = data.slice();

  it('should be possible to create a sample function using the supplied rng.', function() {
    var sample = createDangerousButPerformantSample(rng());

    var tests = vec(7, 0).map(function() {
      return sample(2, data);
    });

    assert.deepEqual(tests, [[14, 13], [14, 15], [15, 13], [15, 8], [14, 20], [8, 13], [20, 13]]);

    // Ensuring the state of the array did not change
    assert.deepEqual(copy, data);
  });
});

describe('#.naiveSample', function() {
  var createNaiveSample = lib.naiveSample.createNaiveSample;

  it('should be possible to create a sample function using the supplied rng.', function() {
    var sample = createNaiveSample(rng());

    var data = [13, 14, 15, 8, 20, 20];

    var tests = vec(7, 0).map(function() {
      return sample(2, data);
    });

    assert.deepEqual(tests, [[15, 14], [14, 15], [8, 14], [15, 20], [15, 20], [20, 8], [20, 15]]);
  });
});

describe('#.createShuffleInPlace', function() {
  var createShuffleInPlace = lib.shuffleInPlace.createShuffleInPlace;

  it('should be possible to create a shuffle in place function using the supplied rng.', function() {
    var shuffle = createShuffleInPlace(rng()),
        array = [1, 2, 3, 4, 5];

    shuffle(array);
    assert.deepEqual(array, [2, 1, 3, 4, 5]);
  });
});

describe('#.createWeightedIndex', function() {
  var createWeightedRandomIndex = lib.weightedRandomIndex.createWeightedRandomIndex;

  function freq(fn, target) {
    var sample = 10 * 1000,
        af = {},
        rf = {},
        r;

    for (var i = 0; i < sample; i++) {
      r = fn(target);
      af[r] = af[r] || 0;
      af[r]++;
    }

    for (var k in af) {
      rf[k] = af[k] / sample;
    }

    return {absolute: af, relative: rf};
  }

  it('should correctly return a random index from weighted list.', function() {
    var weightedRandomIndex = createWeightedRandomIndex(rng()),
        weights = [0.1, 0.1, 0.8];

    var f = freq(weightedRandomIndex, weights);

    assert.deepEqual(f.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });
  });

  it('should also work with absolute weights.', function() {
    var weightedRandomIndex = createWeightedRandomIndex(rng()),
        weights = [4, 4, 32];

    var f = freq(weightedRandomIndex, weights);

    assert.deepEqual(f.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });
  });

  it('should also work with a weight getter.', function() {
    var getter = function(item) {
      return item.weight;
    };

    var mapper = function(value, index) {
      return {
        weight: value,
        index: index
      };
    };

    var relativeWeightedRandomIndex = createWeightedRandomIndex({rng: rng(), getWeight: getter}),
        absoluteWeightedRandomIndex = createWeightedRandomIndex({rng: rng(), getWeight: getter});

    var relativeWeights = [0.1, 0.1, 0.8].map(mapper),
        absoluteWeights = [4, 4, 32].map(mapper);

    var relativeF = freq(relativeWeightedRandomIndex, relativeWeights),
        absoluteF = freq(absoluteWeightedRandomIndex, absoluteWeights);

    assert.deepEqual(relativeF.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });

    assert.deepEqual(absoluteF.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });
  });
});

describe('#.createCachedWeightedRandomIndex', function() {
  var createCachedWeightedRandomIndex = lib.weightedRandomIndex.createCachedWeightedRandomIndex;

  var RELATIVE_WEIGHTS = [0.1, 0.1, 0.8],
      ABSOLUTE_WEIGHTS = [4, 4, 32];

  function freq(fn) {
    var sample = 10 * 1000,
        af = {},
        rf = {},
        r;

    for (var i = 0; i < sample; i++) {
      r = fn();
      af[r] = af[r] || 0;
      af[r]++;
    }

    for (var k in af) {
      rf[k] = af[k] / sample;
    }

    return {absolute: af, relative: rf};
  }

  it('should correctly return a random index from weighted list.', function() {
    var weightedRandomIndex = createCachedWeightedRandomIndex(rng(), RELATIVE_WEIGHTS);

    var f = freq(weightedRandomIndex);

    assert.deepEqual(f.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });
  });

  it('should also work with absolute weights.', function() {
    var weightedRandomIndex = createCachedWeightedRandomIndex(rng(), ABSOLUTE_WEIGHTS);

    var f = freq(weightedRandomIndex);

    assert.deepEqual(f.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });
  });

  it('should also work with a weight getter.', function() {
    var getter = function(item) {
      return item.weight;
    };

    var mapper = function(value, index) {
      return {
        weight: value,
        index: index
      };
    };

    var relativeWeights = RELATIVE_WEIGHTS.map(mapper),
        absoluteWeights = ABSOLUTE_WEIGHTS.map(mapper);

    var relativeWeightedRandomIndex = createCachedWeightedRandomIndex({rng: rng(), getWeight: getter}, relativeWeights),
        absoluteWeightedRandomIndex = createCachedWeightedRandomIndex({rng: rng(), getWeight: getter}, absoluteWeights);

    var relativeF = freq(relativeWeightedRandomIndex),
        absoluteF = freq(absoluteWeightedRandomIndex);

    assert.deepEqual(relativeF.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });

    assert.deepEqual(absoluteF.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });
  });
});

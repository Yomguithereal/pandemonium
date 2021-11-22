/**
 * Pandemonium Library Unit Tests
 * ===============================
 */
var assert = require('assert');
var seedrandom = require('seedrandom');

var lib = require('./');
var utils = require('./utils.js');

var rng = function () {
  return seedrandom('shawarma');
};

var vec = function (size, fill) {
  var array = new Array(size);

  for (var i = 0; i < size; i++) array[i] = fill;

  return array;
};

describe('utils', function () {
  describe('triu conversions', function () {
    // n = 5

    // Matrix representation
    //    0. 1.  2.  3.  4.
    // 0. 0  a0  a1  a2  a3
    // 1. 0   0  a4  a5  a6
    // 2  0   0   0  a7  a8
    // 3. 0   0   0   0  a9
    // 4. 0   0   0   0   0

    // Linear representation
    // [0,  1,  2,  3,  4,  5,  6,  7,  8,  9 ]
    // [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9]

    var coords = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4]
    ];

    var linear = utils.indices(10);

    it('should be possible to assess the linear length of a triu matrix.', function () {
      var l = utils.triuLinearLength(5);

      assert.strictEqual(l, linear.length);
    });

    it('should be possible to convert to triu coordinates.', function () {
      var results = linear.map(function (i) {
        return utils.linearIndexToTriuCoords(5, i);
      });

      assert.deepStrictEqual(results, coords);
    });

    it('should be possible to convert from triu coordinates.', function () {
      var results = coords.map(function (pair) {
        return utils.triuCoordsToLinearIndex(5, pair[0], pair[1]);
      });

      assert.deepStrictEqual(results, linear);
    });
  });
});

describe('#.createRandom', function () {
  var createRandom = lib.createRandom;

  it('should be possible to create a random function using supplied rng.', function () {
    var random = createRandom(rng());

    var numbers = vec(10, 0).map(function () {
      return random(1, 3);
    });

    assert.deepStrictEqual(numbers, [2, 1, 1, 2, 2, 1, 2, 3, 2, 3]);
  });
});

describe('#.createRandomBoolean', function () {
  var createRandomBoolean = lib.createRandomBoolean;

  it('should be possible to create a random function using supplied rng.', function () {
    var randomBoolean = createRandomBoolean(rng());

    var bools = vec(10, 0).map(function () {
      return randomBoolean();
    });

    assert.deepStrictEqual(bools, [
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      false
    ]);
  });
});

describe('#.createRandomFloat', function () {
  var createRandomFloat = lib.createRandomFloat;

  it('should be possible to create a random function using supplied rng.', function () {
    var randomFloat = createRandomFloat(rng());

    var numbers = vec(10, 0).map(function () {
      return randomFloat(-5, 5);
    });

    assert.deepStrictEqual(
      numbers,
      [
        -1.3882625149887873, -2.6951281957879387, -2.0503955872813586,
        -0.4793171781490271, 0.12873486129402423, -2.3493674464758856,
        -0.17451351278587435, 2.0272152885286534, -1.4110661264160034,
        4.861209836885362
      ]
    );
  });
});

describe('#.createRandomIndex', function () {
  var createRandomIndex = lib.createRandomIndex;

  it('should be possible to create a random index function using the supplied rng.', function () {
    var randomIndex = createRandomIndex(rng());

    var fruits = ['apple', 'pear', 'orange'];

    var tests = vec(10, 0).map(function () {
      return randomIndex(fruits);
    });

    assert.deepStrictEqual(tests, [1, 0, 0, 1, 1, 0, 1, 2, 1, 2]);
  });

  it('should be possible to pass the length of the array instead of the array itself.', function () {
    var randomIndex = createRandomIndex(rng());

    var fruits = ['apple', 'pear', 'orange'];

    var tests = vec(10, 0).map(function () {
      return randomIndex(fruits.length);
    });

    assert.deepStrictEqual(tests, [1, 0, 0, 1, 1, 0, 1, 2, 1, 2]);
  });
});

describe('#.createChoice', function () {
  var createChoice = lib.createChoice;

  it('should be possible to create a choice function using the supplied rng.', function () {
    var choice = createChoice(rng());

    var fruits = ['apple', 'pear', 'orange'];

    var tests = vec(10, 0).map(function () {
      return choice(fruits);
    });

    assert.deepStrictEqual(
      tests,
      [1, 0, 0, 1, 1, 0, 1, 2, 1, 2].map(function (index) {
        return fruits[index];
      })
    );
  });
});

describe('#.createFisherYatesSample', function () {
  var createFisherYatesSample = lib.createFisherYatesSample;

  var data = [13, 14, 15, 8, 20];

  it('should be possible to create a sample function using the supplied rng.', function () {
    var fisherYatesSample = createFisherYatesSample(rng());

    var tests = vec(5, 0).map(function () {
      return fisherYatesSample(2, data);
    });

    assert.deepStrictEqual(tests, [
      [14, 13],
      [14, 15],
      [15, 13],
      [15, 8],
      [14, 20]
    ]);
  });

  it('should work when k >= n.', function () {
    var numbers = [1, 2, 3];

    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.fisherYatesSample(3, numbers))
    );
    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.fisherYatesSample(14, numbers))
    );
  });
});

describe('#.createGeometricReservoirSample', function () {
  var createGeometricReservoirSample = lib.createGeometricReservoirSample;

  var data = [13, 14, 15, 8, 20];

  it('should be possible to create a sample function using the supplied rng.', function () {
    var geometricReservoirSample = createGeometricReservoirSample(rng());

    var tests = vec(10, 0).map(function () {
      return geometricReservoirSample(2, data);
    });

    assert.deepStrictEqual(tests, [
      [8, 14],
      [13, 20],
      [8, 20],
      [13, 14],
      [13, 20],
      [15, 8],
      [13, 20],
      [13, 20],
      [20, 8],
      [15, 14]
    ]);
  });

  it('should always return coherent results.', function () {
    vec(50, 0).forEach(function () {
      var sample = lib.geometricReservoirSample(500, utils.indices(5000));

      assert.strictEqual(sample.length, 500);
      assert.strictEqual(new Set(sample).size, 500);
    });
  });

  it("should be possible to give the sequence's length and get indices back.", function () {
    var sample = createGeometricReservoirSample(rng());

    var numbers = [13, 14, 15, 8, 20, 20];

    var tests = vec(7, 0).map(function () {
      return sample(2, numbers.length);
    });

    assert.deepStrictEqual(tests, [
      [5, 1],
      [0, 5],
      [5, 2],
      [3, 5],
      [2, 3],
      [5, 4],
      [0, 3]
    ]);
  });

  it('should work when k >= n.', function () {
    var numbers = [1, 2, 3];

    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.geometricReservoirSample(3, numbers))
    );
    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.geometricReservoirSample(14, numbers))
    );
  });

  it('should work when k >= n with indices.', function () {
    var sample = createGeometricReservoirSample(rng());

    var indices = sample(5, 3);

    assert.deepStrictEqual(indices, [0, 1, 2]);
  });
});

describe('#.createReservoirSample', function () {
  var createReservoirSample = lib.createReservoirSample;

  var data = [13, 14, 15, 8, 20];

  it('should be possible to create a sample function using the supplied rng.', function () {
    var reservoirSample = createReservoirSample(rng());

    var tests = vec(10, 0).map(function () {
      return reservoirSample(2, data);
    });

    assert.deepStrictEqual(tests, [
      [8, 20],
      [15, 20],
      [15, 20],
      [13, 15],
      [13, 15],
      [15, 14],
      [15, 14],
      [13, 8],
      [8, 14],
      [15, 14]
    ]);
  });

  it('should always return coherent results.', function () {
    vec(50, 0).forEach(function () {
      var sample = lib.reservoirSample(500, utils.indices(5000));

      assert.strictEqual(sample.length, 500);
      assert.strictEqual(new Set(sample).size, 500);
    });
  });

  it('should work when k >= n.', function () {
    var numbers = [1, 2, 3];

    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.reservoirSample(3, numbers))
    );
    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.reservoirSample(14, numbers))
    );
  });
});

describe('ReservoirSampler', function () {
  it('should work as expected.', function () {
    var sampler = new lib.ReservoirSampler(10, rng());

    utils.indices(100).forEach(function (i) {
      sampler.process(i);
    });

    assert.deepStrictEqual(
      sampler.end(),
      [34, 70, 82, 15, 80, 79, 56, 16, 63, 91]
    );

    // Cannot use after end
    assert.throws(function () {
      sampler.process(45);
    });

    sampler = new lib.ReservoirSampler(15, rng());

    utils.indices(15).forEach(function (i) {
      sampler.process(i);
    });

    assert.deepStrictEqual(sampler.end(), utils.indices(15));

    sampler = new lib.ReservoirSampler(15, rng());

    utils.indices(5).forEach(function (i) {
      sampler.process(i);
    });

    assert.deepStrictEqual(sampler.end(), utils.indices(5));

    sampler = new lib.ReservoirSampler(15, rng());

    assert.deepStrictEqual(sampler.end(), []);
  });
});

describe('#.createSampleWithReplacements', function () {
  var createSampleWithReplacements = lib.createSampleWithReplacements;

  var data = [13, 14, 15, 8, 20];

  it('should be possible to create a sample function using the supplied rng.', function () {
    var sample = createSampleWithReplacements(rng());

    var tests = vec(3, 0).map(function () {
      return sample(4, data);
    });

    assert.deepStrictEqual(tests, [
      [14, 14, 14, 15],
      [15, 14, 15, 8],
      [14, 20, 8, 8]
    ]);
  });
});

describe('#.createShuffle', function () {
  var createShuffle = lib.createShuffle;

  it('should be possible to create a shuffle function using the supplied rng.', function () {
    var shuffle = createShuffle(rng());

    var shuffled = shuffle([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(shuffled, [2, 1, 3, 4, 5]);
  });
});

describe('#.createDangerouslyMutatingSample', function () {
  var createDangerouslyMutatingSample = lib.createDangerouslyMutatingSample;

  var data = [13, 14, 15, 8, 20],
    copy = data.slice();

  it('should be possible to create a sample function using the supplied rng.', function () {
    var sample = createDangerouslyMutatingSample(rng());

    var tests = vec(7, 0).map(function () {
      return sample(2, data);
    });

    assert.deepStrictEqual(tests, [
      [14, 13],
      [14, 15],
      [15, 13],
      [15, 8],
      [14, 20],
      [8, 13],
      [20, 13]
    ]);

    // Ensuring the state of the array did not change
    assert.deepStrictEqual(copy, data);
  });

  it('should work when k >= n.', function () {
    var numbers = [1, 2, 3];

    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.dangerouslyMutatingSample(3, numbers))
    );
    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.dangerouslyMutatingSample(14, numbers))
    );
  });
});

describe('#.naiveSample', function () {
  var createNaiveSample = lib.createNaiveSample;

  it('should be possible to create a sample function using the supplied rng.', function () {
    var sample = createNaiveSample(rng());

    var data = [13, 14, 15, 8, 20, 20];

    var tests = vec(7, 0).map(function () {
      return sample(2, data);
    });

    assert.deepStrictEqual(tests, [
      [15, 14],
      [14, 15],
      [8, 14],
      [15, 20],
      [15, 20],
      [20, 8],
      [20, 15]
    ]);
  });

  it("should be possible to give the sequence's length and get indices back.", function () {
    var sample = createNaiveSample(rng());

    var data = [13, 14, 15, 8, 20, 20];

    var tests = vec(7, 0).map(function () {
      return sample(2, data.length);
    });

    assert.deepStrictEqual(tests, [
      [2, 1],
      [1, 2],
      [3, 1],
      [2, 4],
      [2, 5],
      [4, 3],
      [4, 2]
    ]);
  });

  it('should work when k >= n.', function () {
    var numbers = [1, 2, 3];

    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.naiveSample(3, numbers))
    );
    assert.deepStrictEqual(
      new Set(numbers),
      new Set(lib.naiveSample(14, numbers))
    );
  });

  it('should work when k >= n with indices.', function () {
    var sample = createNaiveSample(rng());

    var indices = sample(5, 3);

    assert.deepStrictEqual(indices, [0, 1, 2]);
  });
});

describe('#.createShuffleInPlace', function () {
  var createShuffleInPlace = lib.createShuffleInPlace;

  it('should be possible to create a shuffle in place function using the supplied rng.', function () {
    var shuffle = createShuffleInPlace(rng()),
      array = [1, 2, 3, 4, 5];

    shuffle(array);
    assert.deepStrictEqual(array, [2, 1, 3, 4, 5]);
  });
});

describe('#.createWeightedRandomIndex', function () {
  var createWeightedRandomIndex = lib.createWeightedRandomIndex;

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

  it('should correctly return a random index from weighted list.', function () {
    var weightedRandomIndex = createWeightedRandomIndex(rng()),
      weights = [0.1, 0.1, 0.8];

    var f = freq(weightedRandomIndex, weights);

    assert.deepStrictEqual(f.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });
  });

  it('should also work with absolute weights.', function () {
    var weightedRandomIndex = createWeightedRandomIndex(rng()),
      weights = [4, 4, 32];

    var f = freq(weightedRandomIndex, weights);

    assert.deepStrictEqual(f.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });
  });

  it('should also work with a weight getter.', function () {
    var getter = function (item) {
      return item.weight;
    };

    var mapper = function (value, index) {
      return {
        weight: value,
        index: index
      };
    };

    var relativeWeightedRandomIndex = createWeightedRandomIndex({
        rng: rng(),
        getWeight: getter
      }),
      absoluteWeightedRandomIndex = createWeightedRandomIndex({
        rng: rng(),
        getWeight: getter
      });

    var relativeWeights = [0.1, 0.1, 0.8].map(mapper),
      absoluteWeights = [4, 4, 32].map(mapper);

    var relativeF = freq(relativeWeightedRandomIndex, relativeWeights),
      absoluteF = freq(absoluteWeightedRandomIndex, absoluteWeights);

    assert.deepStrictEqual(relativeF.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });

    assert.deepStrictEqual(absoluteF.relative, {
      0: 0.0977,
      1: 0.0947,
      2: 0.8076
    });
  });
});

describe('#.createCachedWeightedRandomIndex', function () {
  var createCachedWeightedRandomIndex = lib.createCachedWeightedRandomIndex;

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

  it('should correctly return a random index from weighted list.', function () {
    var weightedRandomIndex = createCachedWeightedRandomIndex(
      rng(),
      RELATIVE_WEIGHTS
    );

    var f = freq(weightedRandomIndex);

    assert.deepStrictEqual(f.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });
  });

  it('should also work with absolute weights.', function () {
    var weightedRandomIndex = createCachedWeightedRandomIndex(
      rng(),
      ABSOLUTE_WEIGHTS
    );

    var f = freq(weightedRandomIndex);

    assert.deepStrictEqual(f.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });
  });

  it('should also work with a weight getter.', function () {
    var getter = function (item) {
      return item.weight;
    };

    var mapper = function (value, index) {
      return {
        weight: value,
        index: index
      };
    };

    var relativeWeights = RELATIVE_WEIGHTS.map(mapper),
      absoluteWeights = ABSOLUTE_WEIGHTS.map(mapper);

    var relativeWeightedRandomIndex = createCachedWeightedRandomIndex(
        {rng: rng(), getWeight: getter},
        relativeWeights
      ),
      absoluteWeightedRandomIndex = createCachedWeightedRandomIndex(
        {rng: rng(), getWeight: getter},
        absoluteWeights
      );

    var relativeF = freq(relativeWeightedRandomIndex),
      absoluteF = freq(absoluteWeightedRandomIndex);

    assert.deepStrictEqual(relativeF.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });

    assert.deepStrictEqual(absoluteF.relative, {
      0: 0.1012,
      1: 0.0999,
      2: 0.7989
    });
  });
});

describe('#.createWeightedChoice', function () {
  var createWeightedChoice = lib.createWeightedChoice;

  function freq(fn, target) {
    var sample = 10 * 1000,
      af = {},
      rf = {},
      r;

    for (var i = 0; i < sample; i++) {
      r = fn(target)[0];
      af[r] = af[r] || 0;
      af[r]++;
    }

    for (var k in af) {
      rf[k] = af[k] / sample;
    }

    return {absolute: af, relative: rf};
  }

  it('should correctly return a random item from weighted list.', function () {
    var weightedChoice = createWeightedChoice({
      rng: rng(),
      getWeight: function (item) {
        return item[1];
      }
    });

    var weights = [
      ['pear', 0.1],
      ['apple', 0.1],
      ['cherry', 0.8]
    ];

    var f = freq(weightedChoice, weights);

    assert.deepStrictEqual(f.relative, {
      pear: 0.0977,
      apple: 0.0947,
      cherry: 0.8076
    });
  });
});

describe('#.createCachedWeightedChoice', function () {
  var createCachedWeightedChoice = lib.createCachedWeightedChoice;

  function freq(fn) {
    var sample = 10 * 1000,
      af = {},
      rf = {},
      r;

    for (var i = 0; i < sample; i++) {
      r = fn()[0];
      af[r] = af[r] || 0;
      af[r]++;
    }

    for (var k in af) {
      rf[k] = af[k] / sample;
    }

    return {absolute: af, relative: rf};
  }

  it('should correctly return a random item from weighted list.', function () {
    var weights = [
      ['pear', 0.1],
      ['apple', 0.1],
      ['cherry', 0.8]
    ];

    var weightedChoice = createCachedWeightedChoice(
      {
        rng: rng(),
        getWeight: function (item) {
          return item[1];
        }
      },
      weights
    );

    var f = freq(weightedChoice);

    assert.deepStrictEqual(f.relative, {
      pear: 0.1012,
      apple: 0.0999,
      cherry: 0.7989
    });
  });
});

describe('#.createRandomString', function () {
  var createRandomString = lib.createRandomString;

  it('should be able to produce random string of fixed length.', function () {
    var randomString = createRandomString(rng());

    var tests = [
      '',
      'w',
      'os',
      'CFq',
      'DRw',
      '9TLYZ',
      'QD02aP',
      'VXNLajS',
      'l07VLFXK'
    ];

    var results = tests.map(function (s) {
      return randomString(s.length);
    });

    assert.deepStrictEqual(results, tests);
  });

  it('should be able to produce random string of variable length.', function () {
    var randomString = createRandomString(rng());

    var tests = [
      [0, 0, ''],
      [0, 2, ''],
      [0, 3, 'C'],
      [0, 3, 'qD'],
      [0, 3, 'w9'],
      [0, 10, 'LYZQD02a'],
      [4, 7, 'VXNLaj'],
      [5, 5, 'l07VL'],
      [3, 14, 'XKuVG2i18']
    ];

    var results = tests.map(function (s) {
      return randomString(s[0], s[1]);
    });

    assert.deepStrictEqual(
      results,
      tests.map(function (s) {
        return s[2];
      })
    );

    var batch = new Array(1000);

    for (var i = 0; i < 1000; i++) batch[i] = randomString(3, 14);

    assert(
      batch.every(function (s) {
        return s.length >= 3 && s.length <= 14;
      })
    );
  });

  it('should produce random strings based on a custom alphabet.', function () {
    var randomString = createRandomString(rng(), 'ATGC');

    var tests = [
      '',
      'T',
      'AT',
      'TGT',
      'TGT',
      'CGGCC',
      'GTCCAG',
      'CCGGAAG',
      'ACCCGGCG'
    ];

    var results = tests.map(function (s) {
      return randomString(s.length);
    });

    assert.deepStrictEqual(results, tests);
  });
});

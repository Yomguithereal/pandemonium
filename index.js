/**
 * Pandemonium Library Endpoint
 * =============================
 *
 * Exporting the library's functions.
 */
var choice = require('./choice.js');
var dangerouslyMutatingSample = require('./dangerously-mutating-sample.js');
var fisherYatesSample = require('./fisher-yates-sample.js');
var geometricReservoirSample = require('./geometric-reservoir-sample.js');
var naiveSample = require('./naive-sample.js');
var random = require('./random.js');
var randomBoolean = require('./random-boolean.js');
var randomFloat = require('./random-float.js');
var randomIndex = require('./random-index.js');
var randomString = require('./random-string.js');
var reservoirSample = require('./reservoir-sample.js');
var sampleWithReplacements = require('./sample-with-replacements.js');
var shuffle = require('./shuffle.js');
var shuffleInPlace = require('./shuffle-in-place.js');
var weightedChoice = require('./weighted-choice.js');
var weightedRandomIndex = require('./weighted-random-index.js');

exports.choice = choice;
exports.createChoice = choice.createChoice;

exports.dangerouslyMutatingSample = dangerouslyMutatingSample;
exports.createDangerouslyMutatingSample =
  dangerouslyMutatingSample.createDangerouslyMutatingSample;

exports.fisherYatesSample = fisherYatesSample;
exports.createFisherYatesSample = fisherYatesSample.createFisherYatesSample;

exports.geometricReservoirSample = geometricReservoirSample;
exports.createGeometricReservoirSample =
  geometricReservoirSample.createGeometricReservoirSample;

exports.naiveSample = naiveSample;
exports.createNaiveSample = naiveSample.createNaiveSample;

exports.random = random;
exports.createRandom = random.createRandom;

exports.randomBoolean = randomBoolean;
exports.createRandomBoolean = randomBoolean.createRandomBoolean;

exports.randomFloat = randomFloat;
exports.createRandomFloat = randomFloat.createRandomFloat;

exports.randomIndex = randomIndex;
exports.createRandomIndex = randomIndex.createRandomIndex;

exports.randomString = randomString;
exports.createRandomString = randomString.createRandomString;

exports.reservoirSample = reservoirSample;
exports.createReservoirSample = reservoirSample.createReservoirSample;
exports.ReservoirSampler = reservoirSample.ReservoirSampler;

exports.sampleWithReplacements = sampleWithReplacements;
exports.createSampleWithReplacements =
  sampleWithReplacements.createSampleWithReplacements;

exports.shuffle = shuffle;
exports.createShuffle = shuffle.createShuffle;

exports.shuffleInPlace = shuffleInPlace;
exports.createShuffleInPlace = shuffleInPlace.createShuffleInPlace;

exports.weightedChoice = weightedChoice;
exports.createWeightedChoice = weightedChoice.createWeightedChoice;
exports.createCachedWeightedChoice = weightedChoice.createCachedWeightedChoice;

exports.weightedRandomIndex = weightedRandomIndex;
exports.createWeightedRandomIndex =
  weightedRandomIndex.createWeightedRandomIndex;
exports.createCachedWeightedRandomIndex =
  weightedRandomIndex.createCachedWeightedRandomIndex;

[![Build Status](https://travis-ci.org/Yomguithereal/pandemonium.svg)](https://travis-ci.org/Yomguithereal/pandemonium)

# Pandemonium

Pandemonium is a dead simple JavaScript library providing typical random-related functions such as `choice`, `sample` etc.

The library also provides a way to create any of the available functions using a custom random source ([seedrandom](https://www.npmjs.com/package/seedrandom), for instance).

# Installation

```
npm install --save pandemonium
```

# Usage

## Summary

* [choice](#choice)
* [dangerousButPerformantSample](#dangerousbutperformantsample)
* [naiveSample](#naivesample)
* [random](#random)
* [randomIndex](#randomindex)
* [randomString](#randomstring)
* [sample](#sample)
* [sampleWithReplacements](#samplewithreplacements)
* [shuffle](#shuffle)
* [shuffleInPlace](#shuffleinplace)
* [weightedChoice](#weightedchoice)
* [weightedRandomIndex](#weightedrandomindex)

## choice

Function returning a random item from the given array.

```js
import choice from 'pandemonium/choice';
// Or
import {choice} from 'pandemonium';

choice(['apple', 'orange', 'pear']);
>>> 'orange'

// To create your own function using custom RNG
import {createChoice} from 'pandemonium/choice';

const customChoice = createChoice(rng);
```

## dangerousButPerformantSample

Function returning a sample of size `k` from the given array.

This function runs in `O(k)` time & memory but is somewhat dangerous because it will mutate the given array while performing its Fisher-Yates shuffle before reverting the mutations at the end.

```js
import dangerousButPerformantSample from 'pandemonium/dangerous-but-performant-sample';
// Or
import {dangerousButPerformantSample} from 'pandemonium';

dangerousButPerformantSample(2, ['apple', 'orange', 'pear', 'pineapple']);
>>> ['apple', 'pear']

// To create your own function using custom RNG
import {createDangerousButPerformantSample} from 'pandemonium/dangerous-but-performant-sample';

const customSample = createDangerousButPerformantSample(rng);
```

## naiveSample

Function returning a sample of size `k` from the given array.

This function works by keeping a `Set` of the already picked items and choosing a random item in the array until we have the desired `k` items.

While it is a good pick for cases when `k` is little compared to the size of your array, this function will see its performance drop really fast when `k` becomes proportionally bigger.

```js
import naiveSample from 'pandemonium/naive-sample';
// Or
import {naiveSample} from 'pandemonium';

naiveSample(2, ['apple', 'orange', 'pear', 'pineapple']);
>>> ['apple', 'pear']

// Alternatively, you can pass the array's length and get
// a sample of indices back
naiveSample(2, 4);
>>> [0, 2]

// To create your own function using custom RNG
import {createNaiveSample} from 'pandemonium/naive-sample';

const customSample = createNaiveSample(rng);
```

## random

Function returning a random integer between given `a` & `b`.

```js
import random from 'pandemonium/random';
// Or
import {random} from 'pandemonium';

random(3, 7);
>>> 4

// To create your own function using custom RNG
import {createRandom} from 'pandemonium/random';

const customRandom = createRandom(rng);
```

## randomIndex

Function returning a random index of the given array.

```js
import randomIndex from 'pandemonium/random-index';
// Or
import {randomIndex} from 'pandemonium';

randomIndex(['apple', 'orange', 'pear']);
>>> 1

// Alternatively, you can give the array's length instead
randomIndex(3);
>>> 2

// To create your own function using custom RNG
import {createRandomIndex} from 'pandemonium/random-index';

const customRandomIndex = createRandomIndex(rng);
```

## randomString

Function returning a random string.

```js
import randomString from 'pandemonium/random-string';
// Or
import {randomString} from 'pandemonium';

// To generate a string of fixed length
randomString(5);
>>> 'gHepM'

// To generate a string of variable length
randomString(3, 7);
>>> 'hySf3'

// To create your own function using custom RNG
import {createRandomString} from 'pandemonium/random-string';

const customRandomString = createRandomString(rng);

// If you need a custom alphabet
const customRandomString = createRandomString(rng, 'ATGC');
```

## sample

Function returning a sample of size `k` from the given array.

This function uses a partial Fisher-Yates shuffle and runs therefore in `O(k)` time but requires `O(n)` memory.

If you need faster sampling, check out [`dangerousButPerformantSample`](#dangerousbutperformantsample) or [`naiveSample`](#naivesample).

```js
import sample from 'pandemonium/sample';
// Or
import {sample} from 'pandemonium';

sample(2, ['apple', 'orange', 'pear', 'pineapple']);
>>> ['apple', 'pear']

// To create your own function using custom RNG
import {createSample} from 'pandemonium/sample';

const customSample = createSample(rng);
```

## sampleWithReplacements

Function returning a sample of size `k` with replacements from the given array. This prosaically means that an items from the array might occur several times in the resulting sample.

The function runs in both `O(k)` time & space complexity.

```js
import sampleWithReplacements from 'pandemonium/sample-with-replacements';
// Or
import {sampleWithReplacements} from 'pandemonium';

sampleWithReplacements(3, ['apple', 'orange', 'pear', 'pineapple']);
>>> ['apple', 'pear', 'apple']

// To create your own function using custom RNG
import {createSampleWithReplacements} from 'pandemonium/sample-with-replacements';

const customSample = createSampleWithReplacements(rng);
```

## shuffle

Function returning a shuffled version of the given array using the Fisher-Yates algorithm.

If what you need is to shuffle the original array in place, check out [`shuffleInPlace`](#shuffleinplace).

```js
import shuffle from 'pandemonium/shuffle';
// Or
import {shuffle} from 'pandemonium';

shuffle(['apple', 'orange', 'pear', 'pineapple']);
>>> ['pear', 'orange', 'apple', 'pineapple']

// To create your own function using custom RNG
import {createShuffle} from 'pandemonium/shuffle';

const customShuffle = createShuffle(rng);
```

## shuffleInPlace

Function shuffling the given array in place using the Fisher-Yates algorithm.

```js
import shuffleInPlace from 'pandemonium/shuffle-in-place';
// Or
import {shuffleInPlace} from 'pandemonium';

const array = ['apple', 'orange', 'pear', 'pineapple'];
shuffleInPlace(array);

// Array was mutated:
array
>>> ['pear', 'orange', 'apple', 'pineapple']

// To create your own function using custom RNG
import {createShuffleInPlace} from 'pandemonium/shuffle-in-place';

const customShuffleInPlace = createShuffleInPlace(rng);
```

## weightedChoice

Function returning a random item from the given array of weights.

Note that weights don't need to be relative.

```js
import weightedChoice from 'pandemonium/weighted-choice';
// Or
import {weightedChoice} from 'pandemonium';

const array = [.1, .1, .4, .3, .1];
weightedChoice(array);
>>> .4

// To create your own function using custom RNG
import {createWeightedChoice} from 'pandemonium/weighted-choice';

const customWeightedChoice = createWeightedChoice(rng);

// If you have an array of objects
const customWeightedChoice = createWeightedChoice({
  rng: rng,
  getWeight: (item, index) => {
    return item.weight;
  }
});

const array = [{fruit: 'pear', weight: 4}, {fruit: 'apple', weight: 30}];
customWeightedChoice(array);
>>> 'apple'


// If you intent to call the function multiple times on the same array,
// you should use the cached version instead:
import {createCachedWeightedChoice} from 'pandemonium/weighted-choice';

const array = [.1, .1, .4, .3, .1];
const customWeightedChoice = createCachedWeightedChoice(rng, array);

customWeightedChoice();
>>> .3
```

## weightedRandomIndex

Function returning a random index from the given array of weights.

Note that weights don't need to be relative.

```js
import weightedRandomIndex from 'pandemonium/weighted-random-index';
// Or
import {weightedRandomIndex} from 'pandemonium';

const array = [.1, .1, .4, .3, .1];
weightedRandomIndex(array);
>>> 2

// To create your own function using custom RNG
import {createWeightedRandomIndex} from 'pandemonium/weighted-random-index';

const customWeightedRandomIndex = createWeightedRandomIndex(rng);

// If you have an array of objects
const customWeightedRandomIndex = createWeightedRandomIndex({
  rng: rng,
  getWeight: (item, index) => {
    return item.weight;
  }
});

const array = [{fruit: 'pear', weight: 4}, {fruit: 'apple', weight: 30}];
customWeightedRandomIndex(array);
>>> 1


// If you intent to call the function multiple times on the same array,
// you should use the cached version instead:
import {createCachedWeightedRandomIndex} from 'pandemonium/weighted-random-index';

const array = [.1, .1, .4, .3, .1];
const customWeightedRandomIndex = createCachedWeightedRandomIndex(rng, array);

customWeightedRandomIndex();
>>> 3
```


# Contribution

Contributions are obviously welcome. Please be sure to lint the code & add the relevant unit tests before submitting any PR.

```
git clone git@github.com:Yomguithereal/pandemonium.git
cd pandemonium
npm install

# To lint the code
npm run lint

# To run the unit tests
npm test
```

# License

[MIT](LICENSE.txt)

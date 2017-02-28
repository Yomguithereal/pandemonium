[![Build Status](https://travis-ci.org/Yomguithereal/pandemonium.svg)](https://travis-ci.org/Yomguithereal/pandemonium)

# Pandemonium

Pandemonium is a very simple JavaScript library providing typical random-related functions such as `choice`, `sample` etc.

The library also provides a way to create any of the available functions using a custom random source ([seedrandom](https://www.npmjs.com/package/seedrandom), for instance).

# Installation

```
npm install --save pandemonium
```

# Usage

## Summary

* [choice](#choice)
* [random](#random)
* [randomIndex](#randomIndex)
* [sample](#sample)
* [shuffle](#shuffle)

## choice

Function returning a random item from the given array.

```js
import choice from 'pandemonium/choice';

choice(['apple', 'orange', 'pear']);
>>> 'orange'

// To create your own function using custom RNG
import {createChoice} from 'pandemonium/choice';

const customChoice = createChoice(rng);
```


## random

Function returning a random integer between given `a` & `b`.

```js
import random from 'pandemonium/random';

random(3, 7);
>>> 4

// To create your own function using custom RNG
import {createRandom} from 'pandemonium/random';

const customRandom = createRandom(rng);
```

## random

Function returning a random index of the given array.

```js
import randomIndex from 'pandemonium/random-index';

randomIndex(['apple', 'orange', 'pear']);
>>> 1

// To create your own function using custom RNG
import {createRandomIndex} from 'pandemonium/random-index';

const customRandomIndex = createRandomIndex(rng);
```

## sample

Function returning a sample of size `k` from the given array.

This function using a partial Fisher-Yates shuffle and runs therefore in `O(k)` time but requires `O(n)` memory.

If you need faster sampling, check out [`dangerousButPerformantSample`](#dangerousbutperformantsample).

```js
import sample from 'pandemonium/sample';

sample(2, ['apple', 'orange', 'pear', 'pineapple']);
>>> ['apple', 'pear']

// To create your own function using custom RNG
import {createSample} from 'pandemonium/sample';

const customSample = createSample(rng);
```

## shuffle

Function returning a shuffled version of the given array using the Fisher-Yates algorithm.

In what you need is shuffle the original array in place, check out [`shuffleInPlace`](#shuffleinplace).

```js
import shuffle from 'pandemonium/shuffle';

shuffle(['apple', 'orange', 'pear', 'pineapple']);
>>> ['pear', 'orange', 'apple', 'pineapple']

// To create your own function using custom RNG
import {createShuffle} from 'pandemonium/shuffle';

const customShuffle = createShuffle(rng);
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

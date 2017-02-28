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

import * as lib from './';
import {createChoice} from './choice';
import shuffleInPlace from './shuffle-in-place';

const dummyRandom = () => 0.5;

const customChoice = createChoice<number>(dummyRandom);
const chosen: number = customChoice([1, 2, 3]);

console.log(chosen, lib);

const arrayToShuffle = [1, 2, 3, 4, 5];
shuffleInPlace<number>(arrayToShuffle);

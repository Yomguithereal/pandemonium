import {createChoice} from './choice';

const dummyRandom = () => 0.5;

const customChoice = createChoice<number>(dummyRandom);
const chosen: number = customChoice([1, 2, 3]);

console.log(chosen);

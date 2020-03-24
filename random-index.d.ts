import {RNGFunction} from './types';

type RandomIndexTarget<T> = Array<T> | number;

type RandomIndexFunction<T> = (target: RandomIndexTarget<T>) => Array<T>;

interface IRandomIndex {
  (target: RandomIndexTarget<T>): Array<T>;
  createRandomIndex(rng: RNGFunction): RandomIndexFunction;
}

declare const randomIndex: IRandomIndex;

export default randomIndex;

import {RNGFunction} from './types';

type NaiveSampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

declare const naiveSample: {
  <T>(n: number, array: Array<T>): Array<T>;
  createNaiveSample<T>(rng: RNGFunction): NaiveSampleFunction<T>;
};

export function createNaiveSample<T>(rng: RNGFunction): NaiveSampleFunction<T>;

export default naiveSample;

import {RNGFunction} from './types';

type NaiveSampleFunction<T> =
  | ((n: number, array: Array<T>) => Array<T>)
  | ((n: number, length: number) => Array<number>);

declare const naiveSample: {
  (n: number, length: number): Array<number>;
  <T>(n: number, array: Array<T>): Array<T>;
  createNaiveSample<T>(rng: RNGFunction): NaiveSampleFunction<T>;
};

export function createNaiveSample<T>(rng: RNGFunction): NaiveSampleFunction<T>;

export default naiveSample;

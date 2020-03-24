import {RNGFunction} from './types';

type SampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

declare const sample: {
  <T>(n: number, array: Array<T>): Array<T>;
  createSample<T>(rng: RNGFunction): SampleFunction<T>;
};

export function createSample<T>(rng: RNGFunction): SampleFunction<T>;

export default sample;

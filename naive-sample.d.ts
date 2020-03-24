import {RNGFunction} from './types';

type NaiveSampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

interface INaiveSample {
  (n: number, array: Array<T>): Array<T>;
  createNaiveSample(rng: RNGFunction): NaiveSampleFunction;
}

declare const naiveSample: INaiveSample;

export default naiveSample;

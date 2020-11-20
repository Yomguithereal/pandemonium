import {RNGFunction} from './types';

type FisherYatesSampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

declare const fisherYatesSample: {
  <T>(n: number, array: Array<T>): Array<T>;
  createFisherYatesSample<T>(rng: RNGFunction): FisherYatesSampleFunction<T>;
};

export function createFisherYatesSample<T>(rng: RNGFunction): FisherYatesSampleFunction<T>;

export default fisherYatesSample;

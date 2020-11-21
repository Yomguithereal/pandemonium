import {RNGFunction} from './types';

type ReservoirSampleFunction<T> = (k: number, array: Array<T>) => Array<T>;

declare const reservoirSample: {
  <T>(k: number, array: Array<T>): Array<T>;
  createReservoirSample<T>(rng: RNGFunction): ReservoirSampleFunction<T>;
};

export function createReservoirSample<T>(rng: RNGFunction): ReservoirSampleFunction<T>;

export default reservoirSample;

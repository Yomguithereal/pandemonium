import {RNGFunction} from './types';

type GeometricReservoirSampleFunction<T> = (k: number, array: Array<T>) => Array<T>;

declare const geometricReservoirSample: {
  <T>(k: number, array: Array<T>): Array<T>;
  createGeometricReservoirSample<T>(rng: RNGFunction): GeometricReservoirSampleFunction<T>;
};

export function createGeometricReservoirSample<T>(rng: RNGFunction): GeometricReservoirSampleFunction<T>;

export default geometricReservoirSample;

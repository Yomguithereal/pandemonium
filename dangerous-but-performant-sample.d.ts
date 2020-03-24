import {RNGFunction} from './types';

type DangerousButPerformantSampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

declare const dangerousButPerformantSample: {
  <T>(n: number, array: Array<T>): Array<T>;
  createDangerousButPerformantSample<T>(rng: RNGFunction): DangerousButPerformantSampleFunction<T>;
};

export function createDangerousButPerformantSample<T>(rng: RNGFunction): DangerousButPerformantSampleFunction<T>;

export default dangerousButPerformantSample;

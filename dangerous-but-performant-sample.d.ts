import {RNGFunction} from './types';

type DangerousButPerformantSampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

interface IDangerousButPerformantSample {
  (n: number, array: Array<T>): Array<T>;
  createDangerousButPerformantSample(rng: RNGFunction)<T>: DangerousButPerformantSampleFunction<T>;
}

declare const dangerousButPerformantSample: IDangerousButPerformantSample;

export default dangerousButPerformantSample;

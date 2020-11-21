import {RNGFunction} from './types';

type DangerouslyMutatingSampleFunction<T> = (n: number, array: Array<T>) => Array<T>;

declare const dangerouslyMutatingSample: {
  <T>(n: number, array: Array<T>): Array<T>;
  createDangerouslyMutatingSample<T>(rng: RNGFunction): DangerouslyMutatingSampleFunction<T>;
};

export function createDangerouslyMutatingSample<T>(rng: RNGFunction): DangerouslyMutatingSampleFunction<T>;

export default dangerouslyMutatingSample;

import {RNGFunction} from './types';

type ChoiceFunction<T> = (array: Array<T>) => Array<T>;

interface IChoice {
  (array: Array<T>): Array<T>;
  createChoice(rng: RNGFunction): ChoiceFunction;
}

declare const choice: IChoice;

export default choice;

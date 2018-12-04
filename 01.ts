import { input01 } from './01-input';
const input = input01.split('\n').map(x => Number(x));

type GetFinalFrequency = (deltas: number[]) => number;
type GetRepeatedFrequency = (deltas: number[]) => number;


/*****  part 1  *****/
const getFinalFrequency: GetFinalFrequency = deltas => {
  return deltas.reduce((prv, cur) => {
    return prv + cur;
  });
};

console.log(getFinalFrequency(input));


/*****  part 2  *****/
const getRepeatedFrequency : GetRepeatedFrequency = deltas => {
  const freqMap = new Map<number, boolean>();
  let frequency = 0;
  let firstRepeat: number | null = null;

  while (firstRepeat === null) {
    deltas.forEach((delta) => {
      if (firstRepeat === null && freqMap.has(frequency)) firstRepeat = frequency;
      freqMap.set(frequency, true);
      frequency = frequency + delta;
    });
  }

  return firstRepeat;
};

console.log(getRepeatedFrequency(input));

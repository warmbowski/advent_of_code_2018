import { input01 } from './01-input';

const input = input01.split('\n').map(x => Number(x));

const getFinalFrequency = (deltas: number[]):number => {
  return deltas.reduce((prv, cur) => {
    return prv + cur;
  });
};

console.log(getFinalFrequency(input));


const getRepeatedFrequency = (deltas: number[]):number => {
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

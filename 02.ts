import { input02 } from './02-input';

const input = input02.split('\n');

type GetMapOfString = (str: string, inc?: number, map?: Map<string, number>) => Map<string, number>;
type GetChecksum = (ids: string[]) => number;


const getMapOfString: GetMapOfString = (str) => {
  const chrMap = new Map<string, number>();
  str.split('').forEach(chr => {
    if (!chrMap.has(chr)) chrMap.set(chr, 0);
    const newCount = chrMap.get(chr) + 1;
    
    if (newCount === 0) {
      chrMap.delete(chr);
    } else {
      chrMap.set(chr, newCount);
    }
  });
  return chrMap;
}

const getChecksum: GetChecksum = ids => {
  const counts = new Map<number, number>([[2, 0], [3, 0]]);

  ids.forEach(id => {
    let found2 = false;
    let found3 = false;

    getMapOfString(id).forEach((val) => {
      if (!found2 && val === 2) {
        found2 = true;
        counts.set(2, counts.get(2) + 1);
      }
      if (!found3 && val === 3) {
        found3 = true;
        counts.set(3, counts.get(3) + 1);
      }
    });

  });

  return counts.get(2) * counts.get(3);
}

console.log(getChecksum(input));


const getStringDiff = (strA: string, strB: string) => {
  let diffCount = 0;
  let common = '';

  for (let i = 0; i < strA.length; i++) {
    if (strA.charAt(i) === strB.charAt(i)) {
      common = common + strA.charAt(i);
    } else {
      diffCount++;
    }
  }
  return [diffCount, common];
};

const checkForCorrectId = (ids: string[]) => {
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const [ diffCnt, common ] = getStringDiff(ids[i], ids[j]);
      if (diffCnt === 1) return common;
    }
  }
  return '';
}

console.log(checkForCorrectId(input));

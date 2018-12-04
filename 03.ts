import { input03 } from './03-input';
const claimList = input03.split('\n');

type ClaimParsed = {
  claim: string;
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
type Matrix = Map<string, string[]>
type ParseClaim = (c: string) => ClaimParsed;
type GetMatrix = (claims: string[]) => Matrix;
type GetOverlapAmount = (matrix: Matrix) => number;
type GetNotOverlapped = (matrix: Matrix, claims: string[]) => string[];


/*****  shared  *****/
const parseClaim: ParseClaim = c => {
  const items = c.split(' ');
  const [ x, y ] = items[2].split(',');
  const [ w, h ] = items[3].split('x');

  return {
    claim: c,
    id: items[0].slice(1),
    x: parseInt(x),
    y: parseInt(y),
    w: parseInt(w),
    h: parseInt(h),
  }
}

const getMatrix: GetMatrix = claims => {
  const matrix: Matrix = new Map();

  claims.forEach(claim => {
    const claimObj = parseClaim(claim);

    for (let row = claimObj.x; row < (claimObj.x + claimObj.w); row++) {
      for (let col = claimObj.y; col < (claimObj.y + claimObj.h); col++) {
        const coord = [row, col].join();
        if (matrix.has(coord)) {
          matrix.set(coord, [ ...matrix.get(coord), claimObj.claim ]);
        } else {
          matrix.set(coord, [claimObj.claim]);
        }
      }
    }
  });

  return matrix;
}

const matrix = getMatrix(claimList);


/*****  part 1  *****/
const getOverlapAmount: GetOverlapAmount = matrix => {
  let overlap = 0;

  matrix.forEach(v => {
    if (v.length > 1) overlap++;
  });

  return overlap;
}

console.log(getOverlapAmount(matrix));


/*****  part 2  *****/
const getNotOverlapped: GetNotOverlapped = (matrix, claims) => {
  const claimSet = new Set(claims);

  matrix.forEach(list => {
    if (list.length > 1) {
      list.forEach(claim => {
        claimSet.delete(claim);
      });
    }
  });

  return Array.from(claimSet).map(claim => parseClaim(claim).id);
}

console.log(getNotOverlapped(matrix, claimList));

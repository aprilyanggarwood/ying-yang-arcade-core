import { transpose } from './move.js';

// points earned by merges in a single row when it slides left
function rowScore(row) {
  const nums = row.filter((n) => n !== 0);
  let points = 0;
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === nums[i + 1]) {
      points += nums[i] + nums[i + 1];   // a merge happened: add the NEW tile's value
      i += 2;
    } else {
      i += 1;
    }
  }
  return points;
}

// total points a move would earn in the given direction
function score(board, direction) {
  // reshape the board so `direction` points LEFT, the same way move() does,
  // then sum rowScore across all rows.
  let rows;
  switch (direction) {
    case 'left':
      rows = board;
      break;
    case 'right':
      rows = board.map((row) => row.slice().reverse());
      break;
    case 'up':
      rows = transpose(board);
      break;
    case 'down':
      rows = transpose(board).map((row) => row.slice().reverse());
      break;
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }

  // add up the score from every row
  let total = 0;
  for (const row of rows) {
    total += rowScore(row);
  }
  return total;
}


export { score };

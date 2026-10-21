import { mergeRow, transpose } from './move.js';  

// Calculate the total score for a given board and direction
function score(board, direction) {
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

  let total = 0;
  for (const row of rows) {
    total +=  mergeRow(row).points; // add the points for this row
  }
  return total;
}

export { score };


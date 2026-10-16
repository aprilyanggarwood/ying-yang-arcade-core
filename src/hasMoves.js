import { move } from './move.js';

// true if two boards have the same contents
function sameBoard(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function hasMoves(board) {
  const directions = ['left', 'right', 'up', 'down'];

  // if ANY direction changes the board, a move is still possible
  for (const direction of directions) {
    const moved = move(board, direction);
    if (!sameBoard(moved, board)) {
      return true;
    }
  }

  // none of the four directions changed anything
  return false;
}


export { hasMoves };
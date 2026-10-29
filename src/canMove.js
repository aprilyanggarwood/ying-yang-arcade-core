import { move } from './move.js';

// true if moving this direction would change the board (a valid move)
function canMove(board, direction) {
  const moved = move(board, direction);
  // a move is valid only if the result differs from the original board
  return JSON.stringify(moved) !== JSON.stringify(board);
}

export { canMove }
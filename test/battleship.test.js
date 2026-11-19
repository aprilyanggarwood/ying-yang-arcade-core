import { isValidShot, updateBoard } from '../src/battleship.js';
import { isGameComplete } from '../src/battleship.js';
import { createRandomBoard } from '../src/battleship.js';

// a tiny hand-made board is easiest to reason about; here a 2x2 for illustration
// (your real board is 10x10, but the logic is identical)
const boardShips = [
  ['ship', 'empty'],
  ['empty', 'ship'],
];

console.log(isValidShot(boardShips, 0, 0));   // want true  (ship, not yet shot)
console.log(isValidShot(boardShips, 5, 5));   // want false (out of bounds) — note: adjust for 2x2
console.log(updateBoard(boardShips, 0, 0));   // want row0: ['hit','empty']
console.log(updateBoard(boardShips, 0, 1));   // want row0: ['ship','miss']


console.log(isGameComplete([['hit','miss'],['miss','hit']]));   // want true  (no ships left)
console.log(isGameComplete([['ship','miss'],['miss','hit']]));  // want false (a ship remains)
console.log(isGameComplete([['empty','miss'],['hit','hit']]));  // want true  (empty is not a ship)




const board = createRandomBoard();

// 1. correct dimensions
console.log(board.length, board[0].length);   // want 10 10

// 2. correct total number of ship cells (5+4+3+3+2 = 17)
const shipCells = board.flat().filter((c) => c === 'ship').length;
console.log(shipCells);                        // want 17

// 3. every cell is a valid value
const allValid = board.flat().every((c) => c === 'empty' || c === 'ship');
console.log(allValid);                         // want true

// 4. a seeded generator: repeatable sequence of varied values in [0,1)
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// same seed -> same board (two fresh generators from the same seed)
const boardA = JSON.stringify(createRandomBoard(makeRng(42)));
const boardB = JSON.stringify(createRandomBoard(makeRng(42)));
console.log(boardA === boardB);   // want true
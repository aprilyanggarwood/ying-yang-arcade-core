//pure Battleship logic

const SIZE = 10;
const SHIP_LENGTHS = [5, 4, 3, 3, 2]; // standard Battleship fleet

// is (row, col) a legal shot? in bounds AND not already shot
export function isValidShot(board, row, col) {
  // out of bounds, measured against the real board
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
    return false;
  }
  const cell = board[row][col];
  return cell === 'empty' || cell === 'ship';
}

// apply a shot; return a NEW board (hit if ship, miss if empty)
export function updateBoard(board, row, col) {
  // copy every row so we don't mutate the input (pure function)
  const next = board.map((r) => r.slice());
  if (next[row][col] === 'ship') {
    next[row][col] = 'hit';
  } else if (next[row][col] === 'empty') {
    next[row][col] = 'miss';
  }
  return next;
}

// true when no 'ship' cells remain (every ship has been hit)
export function isGameComplete(board) {
  // flatten all rows into one list, then check none is still a ship
  return board.every((row) => row.every((cell) => cell !== 'ship'));
}


// can a ship of `length` be placed at (row, col) going in `dir` without
// going off-board or overlapping an existing ship?
function canPlace(board, row, col, length, dir) {
  for (let i = 0; i < length; i++) {
    const r = dir === 'h' ? row : row + i;
    const c = dir === 'h' ? col + i : col;
    // off the board?
    if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) return false;
    // already occupied?
    if (board[r][c] !== 'empty') return false;
  }
  return true;
}

// build a fresh board with ships placed randomly; `random` defaults to Math.random
export function createRandomBoard(random = Math.random) {
  // 1. a 10x10 board full of 'empty'
  const board = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => 'empty')
  );

  // 2. place each ship
  for (const length of SHIP_LENGTHS) {
    let placed = false;
    while (!placed) {
      const dir = random() < 0.5 ? 'h' : 'v';
      const row = Math.floor(random() * SIZE);
      const col = Math.floor(random() * SIZE);

      if (canPlace(board, row, col, length, dir)) {
        // 3. mark the cells as 'ship'
        for (let i = 0; i < length; i++) {
          const r = dir === 'h' ? row : row + i;
          const c = dir === 'h' ? col + i : col;
          board[r][c] = 'ship';
        }
        placed = true;
      }
    }
  }

  return board;
}
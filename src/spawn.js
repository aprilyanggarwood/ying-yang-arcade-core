// rng defaults to Math.random, but a caller can pass their own for testing/seeds
function spawn(board, rng = Math.random) {
  // 1. find all empty cells, as {row, col} positions
  const empties = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        empties.push({ r, c });
      }
    }
  }

  // 2. if the board is full, there is nowhere to spawn — return it unchanged
  if (empties.length === 0) {
    return board;
  }

  // 3. pick a random empty cell
  const pick = empties[Math.floor(rng() * empties.length)];

  // 4. decide the new tile: 90% a 2, 10% a 4 (standard 2048)
  const value = rng() < 0.9 ? 2 : 4;

  // 5. build a NEW board with that one cell changed (no mutation)
  const next = board.map((row) => row.slice());   // copy every row
  next[pick.r][pick.c] = value;
  return next;
}


export { spawn };

function mergeRow(row) {
  // STEP 1: keep only the non-zero numbers
  const nums = row.filter((n) => n !== 0);

  // STEP 2: merge equal neighbours once
  const merged = [];
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === nums[i + 1]) {
      merged.push(nums[i] + nums[i + 1]);
      i += 2;   // skip both so they can't merge again
    } else {
      merged.push(nums[i]);
      i += 1;
    }
  }

  // STEP 3: pad with zeros until it's 4 long again
  while (merged.length < 4) {
    merged.push(0);
  }

  return merged;
}

function slideLeft(board) {
  return board.map((row) => mergeRow(row));
}


function slideRight(board) {
  // 1. reverse each row
  const reversed = board.map((row) => row.slice().reverse());

  // 2. slide left (reuse what you already built!)
  const slid = slideLeft(reversed);

  // 3. reverse each row back
  return slid.map((row) => row.slice().reverse());
}

function transpose(board) {
  return board[0].map((_, column) =>
    board.map((row) => row[column]),
  );
}

function move(board, direction) {
  switch (direction) {
    case 'left':
      return slideLeft(board);
    case 'right':
      return slideRight(board);
    case 'up':
      return transpose(slideLeft(transpose(board)));
    case 'down':
      return transpose(slideRight(transpose(board)));
    default:
      throw new Error(`Invalid move direction: ${direction}`);
  }
}


   export { mergeRow, slideLeft, slideRight, transpose, move };
function mergeRow(row) {
  const nums = row.filter((n) => n !== 0);

  const merged = [];
  let points = 0;              // track points earned in this row
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === nums[i + 1]) {
      const sum = nums[i] + nums[i + 1];
      merged.push(sum);
      points += sum; // add the points earned from this merge
      i += 2;
    } else {
      merged.push(nums[i]);
      i += 1;
    }
  }

  while (merged.length < 4) {
    merged.push(0);
  }

  return { row: merged, points };   // return both the new row and the points earned
}

function slideLeft(board) {
  // for each row, merge it and return the new row (ignore points here)
  return board.map((row) => mergeRow(row).row);
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
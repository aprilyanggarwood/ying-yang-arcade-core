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


export { mergeRow };
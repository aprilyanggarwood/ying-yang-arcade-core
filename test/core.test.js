
// Test cases for mergeRow function
// console.log(mergeRow([2, 0, 2, 4])); // want [ 4, 4, 0, 0 ]
// console.log(mergeRow([2, 2, 2, 2])); // want [ 4, 4, 0, 0 ]
// console.log(mergeRow([4, 4, 8, 0])); // want [ 8, 8, 0, 0 ]
// console.log(mergeRow([0, 0, 0, 0])); // want [ 0, 0, 0, 0 ]
// console.log(mergeRow([2, 0, 0, 0])); // want [ 2, 0, 0, 0 ]


// Test cases for slideLeft function
// console.log(slideLeft([
//   [2, 0, 2, 4],
//   [0, 0, 0, 0],
//   [4, 4, 8, 0],
//   [2, 2, 2, 2],
// ]));
// want: [ [ 4, 4, 0, 0 ], [ 0, 0, 0, 0 ], [ 8, 8, 0, 0 ], [ 4, 4, 0, 0 ] ]

// Test cases for slideRight function
const b = [
  [2, 2, 0, 0],
  [0, 0, 0, 0],
  [2, 0, 0, 0],
  [2, 0, 0, 0],
];
console.log(move(b, 'left'));   // want row0: [4,0,0,0]
console.log(move(b, 'right'));  // want row0: [0,0,0,4]
console.log(move(b, 'up'));     // want col0 top: 4  → [[4,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
console.log(move(b, 'down'));   // want col0 bottom: 4 → [[0,0,0,0],[0,0,0,0],[0,0,0,0],[4,2,0,0]]

// Test cases for hasMoves function
console.log(hasMoves([
  [2, 4, 2, 4],
  [4, 2, 4, 2],
  [2, 4, 2, 4],
  [4, 2, 4, 2],
])); // want false — a full, locked board, no merges possible

console.log(hasMoves([
  [2, 2, 4, 8],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
])); // want true — plenty of moves


// Test cases for spawn function
// force the LAST empty cell and force a "2":
// rng() is called twice: once to pick the cell, once to choose 2 vs 4.
// returning 0.99 then 0.0 picks the last empty and a value of 2.
let calls = 0;
const fakeRng = () => (calls++ === 0 ? 0.99 : 0.0);

console.log(spawn([
  [2, 4, 2, 4],
  [4, 2, 4, 2],
  [2, 4, 2, 4],
  [4, 2, 4, 0],   // the only empty cell is bottom-right
], fakeRng));
// want: same board but bottom-right 0 replaced by 2

console.log(spawn([
  [2, 4, 2, 4],
  [4, 2, 4, 2],
  [2, 4, 2, 4],
  [4, 2, 4, 8],   // completely full
]));
// want: unchanged (no empty cells)



// Test cases for score function
console.log(score([
  [2, 2, 4, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
], 'left'));
// row 0: 2+2 merge = 4 points, 4+4 merge = 8 points → want 12

console.log(score([
  [2, 0, 2, 0],
  [8, 8, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
], 'left'));
// row 0: 2+2 = 4 ; row 1: 8+8 = 16 → want 20

console.log(score([
  [2, 4, 2, 4],
  [4, 2, 4, 2],
  [2, 4, 2, 4],
  [4, 2, 4, 2],
], 'left'));
// no merges possible → want 0

console.log(score([
  [2, 0, 0, 0],
  [2, 0, 0, 0],
  [4, 0, 0, 0],
  [4, 0, 0, 0],
], 'up'));
// column 0 upward: 2+2=4, 4+4=8 → want 12

console.log(score([
  [2, 0, 0, 0],
  [2, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
], 'down'));
// column 0 downward: 2+2=4 → want 4
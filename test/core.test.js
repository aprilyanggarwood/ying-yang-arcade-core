
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

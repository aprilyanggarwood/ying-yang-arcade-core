# @april-cs-npm/arcade-core

Pure JavaScript game logic for 2048. No UI, no DOM, no framework — just
functions that take a board and return a new board, so the same logic can run
in Node, in tests, or inside any app.

Built for the CS5610 arcade project.

## Install

```bash
npm install @april-cs-npm/arcade-core
```

## The board

A board is a 4×4 array of rows. Each cell is a number, where `0` means empty.

```js
const board = [
  [2, 2, 0, 0],
  [0, 0, 0, 0],
  [4, 0, 0, 0],
  [4, 0, 0, 0],
];
```

A direction is one of: `"left"`, `"right"`, `"up"`, `"down"`.

## Usage

```js
import { move, spawn, hasMoves, canMove, score } from '@april-cs-npm/arcade-core';

// Slide and merge tiles. Returns a NEW board; the input is never changed.
const afterMove = move(board, 'left');

// Check whether a direction is a valid move (would change the board).
const isValid = canMove(board, 'left');

// How many points that move earned (the sum of tiles created by merges).
const points = score(board, 'left');

// Drop a new 2 or 4 into a random empty cell. Returns a NEW board.
const afterSpawn = spawn(afterMove);

// Is the game still playable? false means game over.
const canKeepPlaying = hasMoves(afterSpawn);
```

## API

### `move(board, direction)`
Slides every tile as far as it can go in `direction`, merging equal neighbours
once per move, and returns the new board. Does not mutate the input.

### `canMove(board, direction)`
Returns `true` if a move in that direction would change the board, `false` otherwise.

### `score(board, direction)`
Returns the points a move in `direction` would earn: the total value of every
tile created by a merge.

### `spawn(board, rng?)`
Returns a new board with one new tile (a `2` 90% of the time, a `4` 10%) placed
in a random empty cell. If the board is full, it is returned unchanged.

`rng` is optional and defaults to `Math.random`. Pass your own function
returning a number in `[0, 1)` to make spawning deterministic (useful for tests
and for seeded games):

```js
const afterSpawn = spawn(board, () => 0); // always picks the first empty cell
```

### `hasMoves(board)`
Returns `true` if any direction would change the board, and `false` when no
move is possible (game over).

## Notes

- Every function is pure: it returns a new board and never changes the one you
  pass in.
- The package contains no Svelte and no DOM access, so it runs anywhere plain
  JavaScript runs.

## Battleship

Pure logic for a 10×10 Battleship board. Like the 2048 functions, these are
pure: they never mutate the board you pass in.

### The board

A board is a 10×10 array of rows. Each cell is one of:

- `"empty"` — open water, not yet shot
- `"ship"` — part of a ship, not yet hit
- `"hit"` — a ship cell that has been shot
- `"miss"` — open water that has been shot

```js
import { createRandomBoard } from '@april-cs-npm/arcade-core';
const board = createRandomBoard();   // 10×10, ships placed at random
```

### API

#### `createRandomBoard(random = Math.random)`
Returns a new 10×10 board with the standard fleet (lengths 5, 4, 3, 3, 2)
placed at random, without overlaps or going off the board. `random` is
optional and defaults to `Math.random`; pass your own function returning a
number in `[0, 1)` for reproducible (seeded) boards.

#### `isValidShot(board, row, col)`
Returns `true` if `(row, col)` is a legal shot: inside the board and not a
cell that has already been shot (`hit` or `miss`).

#### `updateBoard(board, row, col)`
Returns a new board with the shot applied: a `ship` cell becomes `hit`, an
`empty` cell becomes `miss`. Does not mutate the input.

#### `isGameComplete(board)`
Returns `true` when every ship has been hit (no `ship` cells remain).

## License

MIT

# Changelog

All notable changes to this project are documented here.

The format is based on Keep a Changelog, and this project uses
semantic versioning.

## [1.1.0] - 2026-10-28

### Added
- `canMove(board, direction)` — returns whether a move in that direction would
  change the board (a valid move).

### Note
- Kept `score(board, direction)` even though the 10/26 assignment update replaced
  it with `canMove`. It was implemented before the change and is still used by
  the app, so it remains part of the public API.

## [1.0.1] - 2026-10-21

### Changed
- Removed duplicated merge logic. `mergeRow` now returns both the new row and the points earned, and `score` reuses it instead of re-walking each row.

## [1.0.0] - 2026-10-21

### Added
- Initial release of the 2048 game logic.
- `move(board, direction)` — slides and merges tiles in a direction and
  returns a new board.
- `score(board, direction)` — returns the points a move in that direction
  would earn.
- `spawn(board, rng?)` — places a new 2 or 4 in a random empty cell and
  returns a new board; accepts an optional random function for deterministic
  results.
- `hasMoves(board)` — returns whether any move is still possible.
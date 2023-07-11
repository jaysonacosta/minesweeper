import { useState } from 'react';
import {
	BoardProperties,
	Cell,
	CellPosition,
	Game,
	GameDifficulty,
	LocalStorageKeys,
} from '../types/Game';
import useGameTimer from './useGameTimer';
import useLocalStorage from './useLocalStorage';

function createBoardProperties(
	difficulty: GameDifficulty = GameDifficulty.NOVICE
) {
	let properties: BoardProperties;
	switch (difficulty) {
		case GameDifficulty.NOVICE:
			properties = { height: 9, width: 9, mines: 10 };
			break;
		case GameDifficulty.INTERMEDIATE:
			properties = { height: 16, width: 16, mines: 40 };
			break;
		case GameDifficulty.EXPERT:
			properties = { height: 16, width: 30, mines: 99 };
			break;
		case GameDifficulty.CUSTOM:
			// TODO
			properties = { height: 9, width: 9, mines: 10 };
			break;
	}

	return properties;
}

/**
 * Creates an unitialized 2-Dimensional array to represent the Minesweeper board.
 * @param properties The properties of the board.
 * @returns A 2-Dimensional array that represents the board.
 */
function createBoard(properties: BoardProperties) {
	const board = new Array(properties.height).fill(undefined).map((_, row) =>
		new Array(properties.width).fill(undefined).map(
			(_, column): Cell => ({
				pos: { row, column },
				isMine: false,
				isRevealed: false,
				mineCount: 0,
				isFlagged: false,
			})
		)
	);

	return board;
}

const countMinesAroundCell = (
	board: Cell[][],
	lastRow: number,
	lastColumn: number,
	{ row, column }: CellPosition
) => {
	let topLeftCell = 0;
	let topCell = 0;
	let topRightCell = 0;
	let rightCell = 0;
	let bottomRightCell = 0;
	let bottomCell = 0;
	let bottomLeftCell = 0;
	let leftCell = 0;

	if (row === 0) {
		// Cell is in the first row
		bottomCell = board[row + 1][column].isMine ? 1 : 0;

		if (column === 0) {
			// Cell is in the first row and first column
			bottomRightCell = board[row + 1][column + 1].isMine ? 1 : 0;
			rightCell = board[row][column + 1].isMine ? 1 : 0;
		} else if (column === lastColumn) {
			// Cell is in the first row and last column
			bottomLeftCell = board[row + 1][column - 1].isMine ? 1 : 0;
			leftCell = board[row][column - 1].isMine ? 1 : 0;
		} else {
			// Cell is in the first row and any column between first and last
			bottomRightCell = board[row + 1][column + 1].isMine ? 1 : 0;
			rightCell = board[row][column + 1].isMine ? 1 : 0;
			bottomLeftCell = board[row + 1][column - 1].isMine ? 1 : 0;
			leftCell = board[row][column - 1].isMine ? 1 : 0;
		}
	} else if (row === lastRow) {
		// Cell is in the last row
		topCell = board[row - 1][column].isMine ? 1 : 0;

		if (column === 0) {
			// Cell is in the last row and first column
			topRightCell = board[row - 1][column + 1].isMine ? 1 : 0;
			rightCell = board[row][column + 1].isMine ? 1 : 0;
		} else if (column === lastColumn) {
			// Cell is in the last row and last column
			topLeftCell = board[row - 1][column - 1].isMine ? 1 : 0;
			leftCell = board[row][column - 1].isMine ? 1 : 0;
		} else {
			// Cell is in the last row and any column between first and last
			topRightCell = board[row - 1][column + 1].isMine ? 1 : 0;
			rightCell = board[row][column + 1].isMine ? 1 : 0;
			topLeftCell = board[row - 1][column - 1].isMine ? 1 : 0;
			leftCell = board[row][column - 1].isMine ? 1 : 0;
		}
	} else {
		// Cell is in any row between the first and last
		topCell = board[row - 1][column].isMine ? 1 : 0;
		bottomCell = board[row + 1][column].isMine ? 1 : 0;

		if (column === 0) {
			// Cell is in the last row and first column
			topRightCell = board[row - 1][column + 1].isMine ? 1 : 0;
			rightCell = board[row][column + 1].isMine ? 1 : 0;
			bottomRightCell = board[row + 1][column + 1].isMine ? 1 : 0;
		} else if (column === lastColumn) {
			// Cell is in the last row and last column
			topLeftCell = board[row - 1][column - 1].isMine ? 1 : 0;
			leftCell = board[row][column - 1].isMine ? 1 : 0;
			bottomLeftCell = board[row + 1][column - 1].isMine ? 1 : 0;
		} else {
			// Cell is in the last row and any column between first and last
			topRightCell = board[row - 1][column + 1].isMine ? 1 : 0;
			rightCell = board[row][column + 1].isMine ? 1 : 0;
			bottomRightCell = board[row + 1][column + 1].isMine ? 1 : 0;
			topLeftCell = board[row - 1][column - 1].isMine ? 1 : 0;
			leftCell = board[row][column - 1].isMine ? 1 : 0;
			bottomLeftCell = board[row + 1][column - 1].isMine ? 1 : 0;
		}
	}

	const totalMineCount =
		topLeftCell +
		topCell +
		topRightCell +
		rightCell +
		bottomRightCell +
		bottomCell +
		bottomLeftCell +
		leftCell;

	return totalMineCount;
};

/**
 * Generates a random number between `min` and `max`.
 * @param min The lowest number that can be generated (inclusive).
 * @param max The highest number that can be generated (exclusive).
 * @returns A randomly generated number that's inclusive at the min and not max.
 */
function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * A React hook to initialize a Minesweeper game.
 * @returns A 2-Dimensional array representation of the board.
 */
export function useMinesweeper() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isGameWon, setIsGameWon] = useState(false);
	const savedDifficulty = useLocalStorage();
	const [gameDifficulty, setGameDifficulty] = useState(savedDifficulty);
	let boardProperties = createBoardProperties(gameDifficulty);
	const board = createBoard(boardProperties);
	const [gameBoard, setGameBoard] = useState<Cell[][]>(board);
	const [secondsElapsed, handleTimerStart, handleTimerStop, handleTimerReset] =
		useGameTimer();
	const [flags, setFlags] = useState(boardProperties.mines);

	const revealAllMines = () => {
		const newBoard = [...gameBoard];
		newBoard.forEach((row) => {
			row.forEach((cell) => {
				if (cell.isMine) {
					cell.isRevealed = true;
				}
			});
		});

		setGameBoard(newBoard);
	};

	/**
	 * Iterates through all the `Cell`s on the board, tallies up the number of mines around them, and assigns to it that number.
	 */
	const setCellsMineCount = () => {
		const newBoard = [...gameBoard];
		newBoard.forEach((row) => {
			row.forEach((cell) => {
				cell.mineCount = countMinesAroundCell(
					newBoard,
					boardProperties.height - 1,
					boardProperties.width - 1,
					cell.pos
				);
			});
		});

		setGameBoard(newBoard);
	};

	/**
	 * Sets the mines of the Minesweeper board after clicking the first cell
	 * @param pos The position (coordinates) of the cell that was just clicked. This should not be a mine.
	 */
	const setMines = ({ row, column }: CellPosition) => {
		const newBoard = [...gameBoard];
		let mineCount = boardProperties.mines;
		while (mineCount !== 0) {
			const randomRow = getRandomInt(0, boardProperties.height);
			const randomColumn = getRandomInt(0, boardProperties.width);
			const cell = newBoard[randomRow][randomColumn];
			if (
				(cell.pos.row === row && cell.pos.column === column) ||
				cell.pos.row === row - 1 ||
				cell.pos.row === row + 1 ||
				cell.pos.column === column - 1 ||
				cell.pos.column === column + 1
			) {
				continue;
			}
			if (!cell.isMine) {
				cell.isMine = true;
				mineCount = mineCount - 1;
			}
		}

		setGameBoard(newBoard);
	};

	const propogateReveal = (cell: Cell) => {
		const newBoard = [...gameBoard];
		const { row, column } = cell.pos;
		const cellToPropogate = newBoard[row][column];

		if (cellToPropogate.isFlagged) {
			return;
		}

		cellToPropogate.isRevealed = true;
		setGameBoard(newBoard);

		if (cellToPropogate.mineCount === 0) {
			let topLeftCell = null;
			let topCell = null;
			let topRightCell = null;
			let rightCell = null;
			let bottomRightCell = null;
			let bottomCell = null;
			let bottomLeftCell = null;
			let leftCell = null;

			const previousRow = newBoard[row - 1];
			const nextRow = newBoard[row + 1];

			rightCell = newBoard[row][column + 1];
			leftCell = newBoard[row][column - 1];

			if (previousRow) {
				topLeftCell = previousRow[column - 1];
				topCell = previousRow[column];
				topRightCell = previousRow[column + 1];
			}

			if (nextRow) {
				bottomRightCell = nextRow[column + 1];
				bottomCell = nextRow[column];
				bottomLeftCell = nextRow[column - 1];
			}

			if (topLeftCell && !topLeftCell.isRevealed) {
				propogateReveal(topLeftCell);
			}
			if (topCell && !topCell.isRevealed) {
				propogateReveal(topCell);
			}
			if (topRightCell && !topRightCell.isRevealed) {
				propogateReveal(topRightCell);
			}
			if (rightCell && !rightCell.isRevealed) {
				propogateReveal(rightCell);
			}
			if (bottomRightCell && !bottomRightCell.isRevealed) {
				propogateReveal(bottomRightCell);
			}
			if (bottomCell && !bottomCell.isRevealed) {
				propogateReveal(bottomCell);
			}
			if (bottomLeftCell && !bottomLeftCell.isRevealed) {
				propogateReveal(bottomLeftCell);
			}
			if (leftCell && !leftCell.isRevealed) {
				propogateReveal(leftCell);
			}
		}
	};

	/**
	 * Handles the click event for a Cell.
	 * @param pos The position of the `Cell`.
	 */
	const handleCellClick = ({ row, column }: CellPosition) => {
		if (isGameOver) {
			return;
		}
		const newBoard = [...gameBoard];
		const cell = newBoard[row][column];
		if (cell.isFlagged) {
			return;
		}

		if (!isGameStarted) {
			setMines({ row, column });
			setCellsMineCount();
			setIsGameStarted(true);
			handleTimerStart();
		}

		if (cell) {
			cell.isRevealed = true;
			if (cell.isMine) {
				setIsGameOver(true);
				revealAllMines();
				handleTimerStop();
			}
			setGameBoard(newBoard);
			propogateReveal(cell);
			checkGameWon(newBoard);
		}
	};

	/**
	 * Handles the right click event for a Cell (flagging).
	 * @param pos The position of the `Cell`.
	 */
	const handleCellRightClick = ({ row, column }: CellPosition) => {
		if (isGameOver) {
			return;
		}

		const newBoard = [...gameBoard];
		const cell = newBoard[row][column];

		if (cell) {
			if (cell.isRevealed) {
				return;
			}

			cell.isFlagged = !cell.isFlagged;
			setFlags((prev) => (cell.isFlagged ? prev - 1 : prev + 1));
		}
		setGameBoard(newBoard);
	};

	const handleReset = (newDifficulty: GameDifficulty = gameDifficulty) => {
		boardProperties = createBoardProperties(newDifficulty);
		const boardReset = createBoard(boardProperties);
		setGameBoard(boardReset);
		handleTimerReset();
		setFlags(boardProperties.mines);
		setIsGameOver(false);
		setIsGameStarted(false);
	};

	const handleGameDifficultyChange = (newDifficulty: GameDifficulty) => {
		localStorage.setItem(LocalStorageKeys.Difficulty, newDifficulty);
		setGameDifficulty(newDifficulty);
		handleReset(newDifficulty);
	};

	const checkGameWon = (gameBoard: Cell[][]) => {
		let cellsLeft = 0;
		gameBoard.forEach((row) => {
			row.forEach((cell) => {
				if (!cell.isRevealed) {
					cellsLeft++;
				}
			});
		});

		if (cellsLeft === boardProperties.mines) {
			setIsGameOver(true);
			setIsGameWon(true);
			revealAllMines();
			handleTimerStop();
		}
	};

	const game: Game = {
		board: gameBoard,
		secondsElapsed,
		isGameOver,
		flags,
		isGameWon,
		gameDifficulty,
		handleCellClick,
		handleCellRightClick,
		handleReset,
		handleGameDifficultyChange,
	};

	return game;
}

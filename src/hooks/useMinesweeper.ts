import { useState } from 'react';
import {
	BoardProperties,
	Cell,
	CellPosition,
	Game,
	GameDifficulty,
} from '../types/Game';

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
			})
		)
	);

	return board;
}

/**
 * Generates a random number between `min` and `max`.
 * @param min The lowest number that can be generated.
 * @param max The highest number that can be generated.
 * @returns A randomly generated number that's inclusive at the min and not max.
 */
function getRandomIntInclusive(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * A React hook to initialize a Minesweeper game.
 * @returns A 2-Dimensional array representation of the board.
 */
export function useMinesweeper() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const boardProperties = createBoardProperties();
	const board = createBoard(boardProperties);
	const [gameBoard, setGameBoard] = useState<Cell[][]>(board);

	/**
	 * Sets the mines of the Minesweeper board after clicking the first cell
	 * @param pos The position (coordinates) of the cell that was just clicked. This should not be a mine.
	 */
	const setMines = ({ row, column }: CellPosition) => {
		const newBoard = [...gameBoard];
		let mineCount = boardProperties.mines;
		while (mineCount !== 0) {
			const randomRow = getRandomIntInclusive(0, boardProperties.height);
			const randomColumn = getRandomIntInclusive(0, boardProperties.width);
			const cell = newBoard[randomRow][randomColumn];
			if (cell.pos.row === row && cell.pos.column === column) {
				continue;
			}
			if (!cell.isMine) {
				cell.isMine = true;
				mineCount = mineCount - 1;
			}
		}

		setGameBoard(newBoard);
	};

	/**
	 * Handles the click event for a Cell.
	 * @param pos The position of the `Cell`.
	 */
	const handleCellClick = ({ row, column }: CellPosition) => {
		if (!isGameStarted) {
			setMines({ row, column });
			setIsGameStarted(true);
		}

		const newBoard = [...gameBoard];
		const cell = newBoard[row][column];
		if (cell) {
			cell.isRevealed = true;
			if (cell.isMine) {
				setIsGameOver(true);
			}
			setGameBoard(newBoard);
		}
	};

	const handleReset = () => {
		setIsGameOver(true);
	};

	const game: Game = {
		board: gameBoard,
		gameOver: isGameOver,
		handleCellClick,
		handleReset,
	};

	return game;
}

export const plus = (a: number, b: number) => {
	return a + b;
};

import { useState } from 'react';
import { BoardProperties, Cell, Game, GameDifficulty } from '../types/Game';

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

/** *
 * Sets the mines of the Minesweeper board after clicking the first cell
 * @param id The ID of the cell that was just clicked. This should not be a mine.
 */
const setMines = (id: number) => {
	// const newBoard = [...gameBoard];
	// let mineCount = 10;
	// newBoard.forEach((cell) => {
	// 	if (cell.id !== id) {
	// 		const isMine = Math.random() > 0.9 ? true : false;
	// 		if (isMine) {
	// 			if (mineCount > 0) {
	// 				cell.isMine = isMine;
	// 				mineCount--;
	// 			}
	// 		}
	// 	}
	// });
};

export function useMinesweeper() {
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const boardProperties = createBoardProperties();
	const board = createBoard(boardProperties);
	const [gameBoard, setGameBoard] = useState<Cell[][]>(board);

	const handleCellClick = ({
		row,
		column,
	}: {
		row: number;
		column: number;
	}) => {
		if (!isGameStarted) {
			// setMines(id);
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

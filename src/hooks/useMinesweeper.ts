import { useState } from 'react';
import { Cell, Game, GameDifficulty } from '../types/Game';

export function useMinesweeper() {
	const [isGameOver, setIsGameOver] = useState(false);

	const board = new Array(Math.pow(GameDifficulty.NOVICE, 2))
		.fill(undefined)
		.map(
			(_, idx): Cell => ({
				id: idx,
				isMine: false,
				isRevealed: false,
				mineCount: 0,
			})
		);

	const [gameBoard, setGameBoard] = useState<Cell[]>(board);

	const handleCellClick = (id: number) => {
		const newBoard = [...gameBoard];
		const cell = newBoard.find((cellObj) => cellObj.id === id);
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

import { useState } from 'react';
import { Cell, Game, GameDifficulty } from '../types/Game';

export function useMinesweeper() {
	const [isGameOver, setIsGameOver] = useState(false);

	const board = Array<Cell>(GameDifficulty.NOVICE).map(
		(_, idx): Cell => ({
			id: idx,
			isMine: false,
			isRevealed: false,
			mineCount: 0,
		})
	);

	const handleCellClick = (id: number) => {
		const cell = board.find((cellObj) => cellObj.id === id);
		if (cell) {
			cell.isRevealed = true;
			if (cell.isMine) {
				setIsGameOver(true);
			}
		}
	};

	const handleReset = () => {
		setIsGameOver(true);
	};

	const game: Game = {
		board,
		gameOver: isGameOver,
		handleCellClick,
		handleReset,
	};

	return game;
}

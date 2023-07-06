export type Game = {
	board: Cell[][];
	secondsElapsed: number;
	isGameOver: boolean;
	flags: number;
	handleCellClick: (pos: CellPosition) => void;
	handleCellRightClick: (pos: CellPosition) => void;
	handleReset: () => void;
};

export type Cell = {
	pos: CellPosition;
	isMine: boolean;
	isRevealed: boolean;
	isFlagged: boolean;
	mineCount: number;
};

export type CellPosition = {
	row: number;
	column: number;
};

export enum GameDifficulty {
	NOVICE = 'NOVICE',
	INTERMEDIATE = 'INTERMEDIATE',
	EXPERT = 'EXPERT',
	CUSTOM = 'CUSTOM',
}

export interface BoardProperties {
	height: number;
	width: number;
	mines: number;
}

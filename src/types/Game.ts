export type Game = {
	board: Cell[][];
	gameOver: boolean;
	handleCellClick: (pos: { row: number; column: number }) => void;
	handleReset: () => void;
};

export type Cell = {
	pos: { row: number; column: number };
	isMine: boolean;
	isRevealed: boolean;
	mineCount: number;
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

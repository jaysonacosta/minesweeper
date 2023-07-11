export type Game = {
	board: Cell[][];
	secondsElapsed: number;
	isGameOver: boolean;
	flags: number;
	isGameWon: boolean;
	gameDifficulty: GameDifficulty;
	handleCellClick: (pos: CellPosition) => void;
	handleCellRightClick: (pos: CellPosition) => void;
	handleReset: () => void;
	handleGameDifficultyChange: (difficulty: GameDifficulty) => void;
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

export enum MineCountColor {
	ONE = 'text-blue-700',
	TWO = 'text-green-700',
	THREE = 'text-red-700',
	FOUR = 'text-indigo-700',
	FIVE = 'text-amber-700',
	SIX = 'text-cyan-700',
	SEVEN = 'text-black',
	EIGHT = 'text-gray-700',
}

export enum LocalStorageKeys {
	Difficulty = 'DIFFICULTY',
}

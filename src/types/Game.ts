export type Game = {
	board: Cell[];
	gameOver: boolean;
	handleCellClick: (id: number) => void;
	handleReset: () => void;
};

export type Cell = {
	id: number;
	isMine: boolean;
    isRevealed: boolean;
    mineCount: number;
};

export enum GameDifficulty {
	NOVICE = 9,
	INTERMEDIATE = 16,
	EXPERT = 32,
}

import { GameDifficulty, LocalStorageKeys } from '../types/Game';

const useLocalStorage = () => {
	let difficultyToSet: GameDifficulty = GameDifficulty.NOVICE;
	const savedDifficulty = localStorage.getItem(LocalStorageKeys.Difficulty);

	if (savedDifficulty) {
		if (savedDifficulty === GameDifficulty.NOVICE) {
			difficultyToSet = GameDifficulty.NOVICE;
		} else if (savedDifficulty === GameDifficulty.INTERMEDIATE) {
			difficultyToSet = GameDifficulty.INTERMEDIATE;
		} else if (savedDifficulty === GameDifficulty.EXPERT) {
			difficultyToSet = GameDifficulty.EXPERT;
		} else if (GameDifficulty.CUSTOM) {
			difficultyToSet = GameDifficulty.CUSTOM;
		}
	}

	return difficultyToSet;
};

export default useLocalStorage;

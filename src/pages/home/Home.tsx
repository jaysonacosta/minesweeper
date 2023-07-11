import { useMinesweeper } from '../../hooks/useMinesweeper';
import Board from '../../components/Board';
import { FormEvent, useState } from 'react';
import { GameDifficulty } from '../../types/Game';

export default function Home() {
	const [difficulty, setDifficulty] = useState(GameDifficulty.NOVICE);
	const [isMenuActive, setIsMenuActive] = useState(false);

	const {
		board,
		isGameOver,
		secondsElapsed,
		flags,
		isGameWon,
		handleCellClick,
		handleCellRightClick,
		handleReset,
		handleGameDifficultyChange,
	} = useMinesweeper();

	const chooseDifficulty = (evt: FormEvent<HTMLInputElement>) => {
		let chosenDifficulty: GameDifficulty;
		switch (evt.currentTarget.value) {
			case GameDifficulty.NOVICE:
				chosenDifficulty = GameDifficulty.NOVICE;
				break;
			case GameDifficulty.INTERMEDIATE:
				chosenDifficulty = GameDifficulty.INTERMEDIATE;
				break;
			case GameDifficulty.EXPERT:
				chosenDifficulty = GameDifficulty.EXPERT;
				break;
			case GameDifficulty.CUSTOM:
				chosenDifficulty = GameDifficulty.CUSTOM;
				break;
			default:
				chosenDifficulty = GameDifficulty.NOVICE;
		}

		setDifficulty(chosenDifficulty);
	};

	const changeDifficulty = () => {
		handleGameDifficultyChange(difficulty);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-auto">
				<Board
					board={board}
					isGameOver={isGameOver}
					isGameWon={isGameWon}
					handleCellClick={handleCellClick}
					handleCellRightClick={handleCellRightClick}
					handleReset={handleReset}
					handleGameDifficultyChange={handleGameDifficultyChange}
					secondsElapsed={secondsElapsed}
					flags={flags}
				/>
				<br />
				<div className="flex flex-col gap-2">
					<ul className="flex list-none justify-between gap-2 font-mono font-semibold text-black">
						<div
							className="w-full cursor-pointer bg-neutral-300 p-3 text-center hover:bg-neutral-400"
							onClick={() => {
								setIsMenuActive((prev) => !prev);
							}}
						>
							Game
						</div>
						<div className="w-full cursor-pointer bg-neutral-300 p-3 text-center hover:bg-neutral-400">
							Controls
						</div>
					</ul>

					{isMenuActive && (
						<div className="flex flex-col gap-2 bg-neutral-300 p-3 font-mono font-semibold text-black">
							<span>
								<input
									type="radio"
									name="game_difficulty"
									value={GameDifficulty.NOVICE}
									id="novice"
									defaultChecked={true}
									onChange={chooseDifficulty}
								/>
								&nbsp;
								<label htmlFor="novice">Novice</label>
							</span>
							<span>
								<input
									type="radio"
									name="game_difficulty"
									value={GameDifficulty.INTERMEDIATE}
									id="intermediate"
									onChange={chooseDifficulty}
								/>
								&nbsp;
								<label htmlFor="intermediate">Intermediate</label>
							</span>
							<span>
								<input
									type="radio"
									name="game_difficulty"
									value={GameDifficulty.EXPERT}
									id="expert"
									onChange={chooseDifficulty}
								/>
								&nbsp;
								<label htmlFor="expert">Expert</label>
							</span>
							<button
								type="button"
								className="bg-neutral-100 p-2"
								onClick={changeDifficulty}
							>
								New Game
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

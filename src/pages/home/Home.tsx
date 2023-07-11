import { useMinesweeper } from '../../hooks/useMinesweeper';
import Board from '../../components/Board';
import { FormEvent, useState } from 'react';
import { GameDifficulty } from '../../types/Game';

export default function Home() {
	const {
		board,
		isGameOver,
		secondsElapsed,
		flags,
		isGameWon,
		gameDifficulty,
		handleCellClick,
		handleCellRightClick,
		handleReset,
		handleGameDifficultyChange,
	} = useMinesweeper();

	const [difficulty, setDifficulty] = useState(gameDifficulty);
	const [isGameMenuActive, setIsGameMenuActive] = useState(false);
	const [isControlsMenuActive, setIsControlsMenuActive] = useState(false);

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
			<div className="flex w-auto flex-col items-center">
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
					gameDifficulty={gameDifficulty}
				/>
				<br />
				<div className="flex w-full flex-col gap-2">
					<ul className="flex list-none justify-between gap-2 font-mono font-semibold text-black">
						<div
							className="w-full cursor-pointer bg-neutral-300 p-3 text-center hover:bg-neutral-400"
							onClick={() => {
								setIsGameMenuActive((prev) => !prev);
								setIsControlsMenuActive(false);
							}}
						>
							Game
						</div>
						<div
							className="w-full cursor-pointer bg-neutral-300 p-3 text-center hover:bg-neutral-400"
							onClick={() => {
								setIsControlsMenuActive((prev) => !prev);
								setIsGameMenuActive(false);
							}}
						>
							Controls
						</div>
					</ul>

					{isGameMenuActive && (
						<div className="flex flex-col gap-2 bg-neutral-300 p-3 font-mono font-semibold text-black">
							<span>
								<input
									type="radio"
									name="game_difficulty"
									value={GameDifficulty.NOVICE}
									id="novice"
									defaultChecked={gameDifficulty === GameDifficulty.NOVICE}
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
									defaultChecked={
										gameDifficulty === GameDifficulty.INTERMEDIATE
									}
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
									defaultChecked={gameDifficulty === GameDifficulty.EXPERT}
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

					{isControlsMenuActive && (
						<div className="flex flex-col gap-2 bg-neutral-300 p-3 font-mono font-semibold text-black">
							<h2 className="text-xl">Desktop</h2>
							<ul className="list-disc p-5">
								<li>Left-click an empty square to reveal it.</li>
								<li>Right-click an empty square to flag it.</li>
								<li>Click the smiley face to start a new game.</li>
							</ul>
							<h2 className="text-xl">Mobile</h2>
							<ul className="list-disc p-5">
								<li>Tap an empty square to reveal it.</li>
								<li>Long-press an empty square to flag it.</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

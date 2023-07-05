import { useMinesweeper } from '../../hooks/useMinesweeper';
import Board from '../../components/Board';

export default function Home() {
	const {
		board,
		isGameOver,
		properties,
		secondsElapsed,
		handleCellClick,
		handleReset,
	} = useMinesweeper();

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-auto">
				<Board
					board={board}
					isGameOver={isGameOver}
					properties={properties}
					handleCellClick={handleCellClick}
					handleReset={handleReset}
					secondsElapsed={secondsElapsed}
				/>
				<ul className="list-none">
					<li>{isGameOver ? <>Game Over</> : <>Game Not Over</>}</li>
					<li>
						<button onClick={handleReset}>End Game</button>
					</li>
					<li>Game Over:</li>
				</ul>
			</div>
			<div className="w-auto">Board</div>
		</div>
	);
}

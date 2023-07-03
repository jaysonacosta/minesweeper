import { useMinesweeper } from '../../hooks/useMinesweeper';
import Board from '../../components/Board';

export default function Home() {
	const { board, gameOver, handleCellClick, handleReset } = useMinesweeper();

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-auto">
				<Board
					board={board}
					gameOver={gameOver}
					handleCellClick={handleCellClick}
					handleReset={handleReset}
				/>
				<ul className="list-none">
					<li>{gameOver ? <>Game Over</> : <>Game Not Over</>}</li>
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

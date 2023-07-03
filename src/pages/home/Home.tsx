import { useMinesweeper } from '../../hooks/useMinesweeper';

export default function Home() {
	const { board, gameOver, handleCellClick, handleReset } = useMinesweeper();
	console.log(gameOver);
	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='w-auto'>
				<ul className='list-none'>
					<li>{gameOver ? <>Game Over</> : <>Game Not Over</>}</li>
					<li>
						<button onClick={handleReset}>End Game</button>
					</li>
					<li>Game Over:</li>
				</ul>
			</div>
			<div className='w-auto'>Board</div>
		</div>
	);
}

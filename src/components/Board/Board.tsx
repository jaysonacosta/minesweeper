import { Game } from '../../types/Game';
import Cell from '../Cell/';

export default function Board({ board, handleCellClick }: Game) {
	return (
		<div className="grid grid-cols-9 gap-1">
			{board.map((cell) => {
				return (
					<Cell
						id={cell.id}
						key={cell.id}
						isMine={cell.isMine}
						isRevealed={cell.isRevealed}
						handleCellClick={handleCellClick}
					/>
				);
			})}
		</div>
	);
}

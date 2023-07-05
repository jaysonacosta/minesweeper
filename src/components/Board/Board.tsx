import { Game } from '../../types/Game';
import Cell from '../Cell/';

export default function Board({ board, handleCellClick }: Game) {
	return (
		<div className="flex flex-col gap-1">
			{board.map((row, idx) => {
				return (
					<div key={idx} className="flex gap-1">
						{row.map((cell) => {
							return (
								<Cell
									pos={cell.pos}
									key={`${cell.pos.row}-${cell.pos.column}`}
									isMine={cell.isMine}
									isRevealed={cell.isRevealed}
									handleCellClick={handleCellClick}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

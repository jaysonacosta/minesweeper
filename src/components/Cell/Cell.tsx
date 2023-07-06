import { CellPosition } from '../../types/Game';

export default function Cell({
	pos,
	handleCellClick,
	handleCellRightClick,
	isMine,
	isRevealed,
	mineCount,
	isFlagged,
}: {
	pos: CellPosition;
	handleCellClick: (pos: CellPosition) => void;
	handleCellRightClick: (pos: CellPosition) => void;
	isMine: boolean;
	isRevealed: boolean;
	mineCount: number;
	isFlagged: boolean;
}) {
	return (
		<div
			onContextMenu={(evt) => {
				evt.preventDefault();
				handleCellRightClick(pos);
			}}
			onClick={() => {
				handleCellClick(pos);
			}}
			className={`flex h-8 w-8 cursor-pointer items-center justify-center font-mono ${
				!isRevealed ? 'bg-slate-500' : 'bg-slate-400'
			} ${isFlagged ? 'bg-red-400' : ''}`}
		>
			{isRevealed && !isMine && <span>{mineCount}</span>}
			{isRevealed && isMine && <span>💣</span>}
		</div>
	);
}

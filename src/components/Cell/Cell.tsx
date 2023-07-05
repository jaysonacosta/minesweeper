import { CellPosition } from '../../types/Game';

export default function Cell({
	pos,
	handleCellClick,
	isMine,
	isRevealed,
}: {
	pos: CellPosition;
	handleCellClick: (pos: CellPosition) => void;
	isMine: boolean;
	isRevealed: boolean;
}) {
	return (
		<div
			onClick={() => {
				handleCellClick(pos);
			}}
			className={`grid h-8 w-8 cursor-pointer justify-items-center ${
				!isRevealed ? 'bg-slate-500' : 'bg-slate-400'
			}`}
		>
			{isMine ? 'B' : ''}
		</div>
	);
}

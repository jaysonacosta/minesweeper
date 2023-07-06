import { CellPosition, MineCountColor } from '../../types/Game';

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
	let mineCountColor: MineCountColor;

	switch (mineCount) {
		case 1:
			mineCountColor = MineCountColor.ONE;
			break;
		case 2:
			mineCountColor = MineCountColor.TWO;
			break;
		case 3:
			mineCountColor = MineCountColor.THREE;
			break;
		case 4:
			mineCountColor = MineCountColor.FOUR;
			break;
		case 5:
			mineCountColor = MineCountColor.FIVE;
			break;
		case 6:
			mineCountColor = MineCountColor.SIX;
			break;
		case 7:
			mineCountColor = MineCountColor.SEVEN;
			break;
		case 8:
			mineCountColor = MineCountColor.EIGHT;
			break;
		default:
			mineCountColor = MineCountColor.ONE;
	}

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
			}`}
		>
			{!isRevealed && isFlagged && <span>⛳️</span>}
			{isRevealed && !isMine && (
				<span className={`${mineCountColor} font-extrabold`}>
					{mineCount !== 0 ? mineCount : null}
				</span>
			)}
			{isRevealed && isMine && <span>💣</span>}
		</div>
	);
}

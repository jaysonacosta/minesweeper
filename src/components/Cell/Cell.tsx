export default function Cell({
	pos,
	handleCellClick,
	isMine,
	isRevealed,
}: {
	pos: { row: number; column: number };
	handleCellClick: (pos: { row: number; column: number }) => void;
	isMine: boolean;
	isRevealed: boolean;
}) {
	return (
		<div
			onClick={() => {
				handleCellClick(pos);
			}}
			className={`grid h-8 w-8 cursor-pointer justify-items-center rounded-sm border-2 ${
				!isMine ? 'border-slate-500 bg-blue-600' : 'border-red-500 bg-red-600'
			} ${!isRevealed ? 'border-yellow-300' : 'border-green-300'}`}
		>
			{pos.row}, {pos.column}
		</div>
	);
}

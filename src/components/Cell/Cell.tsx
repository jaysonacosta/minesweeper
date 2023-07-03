export default function Cell({
	id,
	handleCellClick,
	isRevealed,
}: {
	id: number;
	handleCellClick: (id: number) => void;
	isMine: boolean;
	isRevealed: boolean;
}) {
	return (
		<div
			onClick={() => {
				handleCellClick(id);
			}}
			className={`grid h-8 w-8 cursor-pointer justify-items-center rounded-sm border-2 ${
				!isRevealed
					? 'border-slate-500 bg-slate-600'
					: 'border-red-500 bg-red-600'
			}`}
		>
			{id}
		</div>
	);
}

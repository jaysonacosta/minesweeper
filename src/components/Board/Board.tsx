import { MouseEvent, useState } from 'react';
import { Game } from '../../types/Game';
import Cell from '../Cell/';

export default function Board({
	board,
	handleCellClick,
	handleCellRightClick,
	handleReset,
	isGameWon,
	secondsElapsed,
	flags,
	isGameOver,
}: Game) {
	const [isClicking, setIsClicking] = useState(false);

	const onMouseEvent = () => {
		setIsClicking((prev) => !prev);
	};

	const disableContextMenu = (
		evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
	) => {
		evt.preventDefault();
	};

	return (
		<div>
			<div className=" w-full bg-neutral-300 p-5">
				<div className="flex justify-around font-mono text-2xl font-bold text-red-600">
					<p className="w-20 rounded-sm bg-slate-800 p-2 text-center">
						{flags}
					</p>
					<p
						className="cursor-pointer rounded-sm bg-slate-800 p-2 text-center hover:bg-slate-600"
						onClick={() => handleReset()}
					>
						{!isGameOver
							? !isClicking
								? '😃'
								: '😲'
							: !isGameWon
							? '💀'
							: '🎉'}
					</p>
					<p className="w-20 rounded-sm bg-slate-800 p-2 text-center">
						{secondsElapsed}
					</p>
				</div>
			</div>
			<div
				className="flex flex-col gap-1 bg-neutral-100 p-1"
				onMouseDown={onMouseEvent}
				onMouseUp={onMouseEvent}
				onContextMenu={disableContextMenu}
			>
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
										handleCellRightClick={handleCellRightClick}
										mineCount={cell.mineCount}
										isFlagged={cell.isFlagged}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

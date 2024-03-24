import { Cell } from "./Cell";
import { boolToSymbol } from "./boardUtils";

/* eslint-disable react/prop-types */
export function SmallBoard({
	id,
	bigBoard,
	boardState,
	disabledBoards,
	gameOver,
	onCellClick,
}) {
	const boardClass = boolToSymbol(bigBoard[id]);

	let cells = Array(9)
		.fill(null)
		.map((_, i) => (
			<Cell
				parentId={id}
				id={i}
				key={i}
				bigBoard={bigBoard[id]}
				disabledBoards={disabledBoards}
				boardState={boardState}
				gameOver={gameOver}
				onCellClick={onCellClick}
			/>
		));

	return (
		<div>
			<div id={id} className={`small board ${boardClass}`}>
				{cells}
			</div>
		</div>
	);
}

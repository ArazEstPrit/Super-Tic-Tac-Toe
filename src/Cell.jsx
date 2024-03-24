import { boolToSymbol } from "./boardUtils";

/* eslint-disable react/prop-types */
export function Cell({
	parentId,
	id,
	boardState,
	bigBoard,
	disabledBoards,
	gameOver,
	onCellClick,
}) {
	const cellValue = boardState[parentId][id];

	const isDisabled =
		cellValue !== null ||
		bigBoard !== null ||
		disabledBoards.includes(parentId) ||
		gameOver;

	const cellIcon =
		cellValue == undefined ? (
			""
		) : (
			<img
				src={
					new URL(
						`./assets/${boolToSymbol(cellValue)}.svg`,
						import.meta.url
					).href
				}
			/>
		);

	return (
		<button
			disabled={isDisabled}
			onClick={() => {
				onCellClick(parentId, id);
			}}
		>
			{cellIcon}
		</button>
	);
}

export let boolToSymbol = bool =>
	bool == undefined ? "" : bool == "tie" ? "tie" : bool ? "X" : "O";

export let noEmptyCellLeft = board =>
	board.find(cell => cell === null) === undefined;

export function checkWin(board, winFn) {
	[
		// Rows
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		// Columns
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		// Diagonals
		[0, 4, 8],
		[2, 4, 6],
	].forEach(e => {
		if (board[e[0]] == undefined) return; // return skips current iterations

		if (board[e[0]] == board[e[1]] && board[e[1]] == board[e[2]]) {
			winFn(board[e[0]]);
			return;
		}
	});

	if (noEmptyCellLeft(board)) winFn("tie");
}

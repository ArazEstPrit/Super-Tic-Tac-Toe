/* eslint-disable react/prop-types */
import { useState } from "react";

let noEmptyCellLeft = (board) =>
	board.find((cell) => cell === null) === undefined;

function checkWin(board, winFn) {
	const winningCombos = [
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
	];

	winningCombos.forEach((e) => {
		if (board[e[0]] == undefined) return; // return skips current iterations

		if (board[e[0]] == board[e[1]] && board[e[1]] == board[e[2]]) {
			winFn(board[e[0]]);
			return;
		}
	});

	if (noEmptyCellLeft(board)) {
		winFn("tie")
	}
}

export default function BigBoard() {
	const [boardState, setBoardState] = useState(
		Array(9)
			.fill()
			.map(() => Array(9).fill(null))
	);
	const [bigBoard, setBigBoard] = useState(Array(9).fill(null));
	const [disabledBoards, setDisabledBoards] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [turn, setTurn] = useState(true);

	function smallBoardWin(boardId, winner) {
		setDisabledBoards("");

		const updatedBigBoard = [...bigBoard];
		updatedBigBoard[boardId] = winner;
		setBigBoard(updatedBigBoard);
		console.log(updatedBigBoard);

		checkWin(updatedBigBoard, bigBoardWin);
	}

	function bigBoardWin(winner) {
		if (winner == "tie") {
			alert("Its a tie")
		} else {
			alert(`Winner is ${winner ? "X" : "O"}`);
		}
		setGameOver(true);
	}

	function handleCellClick(boardId, id) {
		const updatedBoardState = [...boardState];
		updatedBoardState[boardId][id] = turn;
		setTurn(!turn)
		setBoardState(updatedBoardState);

		selectBoard(id);

		checkWin(updatedBoardState[boardId], (winner) => {
			smallBoardWin(boardId, winner);
		});
	}

	function selectBoard(id) {
		if (
			boardState[id].find(cell => cell === null) === undefined
			|| bigBoard[id] != null
		) {
			setDisabledBoards("");
		} else {
			setDisabledBoards("012345678".replace(id, ""));
		}

	}

	function resetBoards() {
		let boards = Array(9)
			.fill()
			.map(() => Array(9).fill(null));
		setBoardState(boards);
		setBigBoard(Array(9).fill(null));
		setDisabledBoards("");
		setTurn(true);
		setGameOver(false);
	}

	let boardElements = [];

	for (let i = 0; i < 9; i++) {
		boardElements.push(
			<SmallBoard
				key={i}
				id={i}
				bigBoard={bigBoard}
				boardState={boardState}
				disabledBoards={disabledBoards}
				gameOver={gameOver}
				onCellClick={handleCellClick}
			/>
		);
	}
	return (
		<>
			<div
				id="game-board"
				className={`big board ${gameOver ? "disabled" : ""}`}
			>
				{boardElements}
			</div>
			
			<div className="game-toolbar">
				<button onClick={resetBoards}>reset</button>
				<span>current turn: {turn?"X":"O"}</span>
			</div>
		</>
	);
}

function SmallBoard({
	id,
	bigBoard,
	boardState,
	disabledBoards,
	gameOver,
	onCellClick,
}) {
	const boardClass =
		bigBoard[id] == true ? "X" : bigBoard[id] == false ? "O" : bigBoard[id] == "tie" ? "tie" : "";
	let cells = [];
	for (let i = 0; i < 9; i++) {
		cells.push(
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
		);
	}
	return (
		<div>
			<div id={id} className={`small board ${boardClass}`}>
				{cells}
			</div>
		</div>
	);
}

function Cell({
	parentId,
	id,
	boardState,
	bigBoard,
	disabledBoards,
	gameOver,
	onCellClick,
}) {
	const handleClick = () => {
		onCellClick(parentId, id);
	};

	const cellValue = boardState[parentId][id];

	const isDisabled =
		cellValue !== null ||
		bigBoard !== null ||
		disabledBoards.includes(parentId) ||
		gameOver;

	let cellIcon;
	if (cellValue == true) {
		cellIcon = <img src={new URL('./assets/X.svg', import.meta.url).href} />;
	} else if (cellValue == false) {
		cellIcon = <img src={new URL('./assets/O.svg', import.meta.url).href} />;
	}

	return (
		<button disabled={isDisabled} onClick={handleClick}>
			{cellIcon}
		</button>
	);
}

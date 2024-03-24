/* eslint-disable react/prop-types */
import { useState } from "react";
import { SmallBoard } from "./SmallBoard";
import { checkWin, boolToSymbol, noEmptyCellLeft } from "./boardUtils";

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
			alert("Its a tie");
		} else {
			alert(`Winner is ${boolToSymbol(winner)}`);
		}
		setGameOver(true);
	}

	function handleCellClick(boardId, id) {
		const updatedBoardState = [...boardState];
		updatedBoardState[boardId][id] = turn;
		setTurn(!turn);
		setBoardState(updatedBoardState);

		selectBoard(id);

		checkWin(updatedBoardState[boardId], winner => {
			smallBoardWin(boardId, winner);
		});
	}

	function selectBoard(id) {
		if (noEmptyCellLeft(boardState[id]) || bigBoard[id] != null) {
			setDisabledBoards("");
		} else {
			setDisabledBoards("012345678".replace(id, ""));
		}
	}

	function resetBoards() {
		setBoardState(
			Array(9)
				.fill()
				.map(() => Array(9).fill(null))
		);
		setBigBoard(Array(9).fill(null));
		setDisabledBoards("");
		setTurn(true);
		setGameOver(false);
	}

	let boardElements = Array(9)
		.fill(null)
		.map((_, i) => (
			<SmallBoard
				key={i}
				id={i}
				bigBoard={bigBoard}
				boardState={boardState}
				disabledBoards={disabledBoards}
				gameOver={gameOver}
				onCellClick={handleCellClick}
			/>
		));

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
				<span>current turn: {boolToSymbol(turn)}</span>
			</div>
		</>
	);
}

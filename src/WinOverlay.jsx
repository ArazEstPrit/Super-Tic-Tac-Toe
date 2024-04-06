import { boolToSymbol } from "./boardUtils";

/* eslint-disable react/prop-types */
export default function WinOverlay({ winner, resetFn }) {
	if (winner == "tie") {
		return (
			<div className="win-animation">
				<div className="win-menu">
					<h1>{"It's a tie!"}</h1>
					<button onClick={resetFn}>Restart</button>
				</div>
			</div>
		);
	}


	let url = new URL(`./assets/${boolToSymbol(winner)}.svg`, import.meta.url).href;

	return (
		<>
			<div className="win-animation">
				<div className="win-menu">
					<h1>
						<img src={url} alt={boolToSymbol(winner)} /> Wins!
					</h1>
					<button onClick={resetFn}>Restart</button>
				</div>
				{Array(30)
					.fill()
					.map((_, i) => (
						<img
							src={url}
							key={i}
							style={{
								"--size": Math.random() * 10 + 10 + "vw",
								"--rotate": Math.random() * 30 - 15 + "deg",
								"--x": Math.random() * 105 - 5 + "vw",
								"--o": Math.random() * 0.5 + 0.5,
								"--d": Math.random() * 1000 + "ms",
							}}
						/>
					))}
			</div>
		</>
	);
}

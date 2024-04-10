import { boolToSymbol } from "./boardUtils";
import { useEffect, useState } from "react";

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
				{Array(50).fill().map((_, i) => <Raindrop i={i} url={url} key={i} />)}
			</div>
		</>
	);
}

function Raindrop({ url, i }) {
	let h = window.innerHeight;
	let w = window.innerWidth;

	let distance = Math.random();

	let baseSpeed = h / 1300;
	let multiplier = Math.min(w / h, 1);
	let length = (baseSpeed / multiplier) * (Math.max(distance, 0.2) * 2 + 0.5);

	let delay = i * 50;

	const [drop, setDrop] = useState();
	useEffect(() => {
		let timeout = setTimeout(() => {
			setDrop(
				<img
					src={url}
					style={{
						"--length": length + "s",
						"--x": Math.random() * 105 - 5 + "vw",
						"--rotate": Math.random() * 30 - 15 + "deg",
						"--size": (1 - distance) * 10 * (1/multiplier) + 5 + "vw",
						"--opacity": (1 - distance) * 0.5 + 0.5,
					}}
				/>
			);

			setTimeout(() => {
				setDrop(<Raindrop i={i} url={url} />);
			}, length * 1000);
		}, delay);

		return () => clearTimeout(timeout);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return drop;
}
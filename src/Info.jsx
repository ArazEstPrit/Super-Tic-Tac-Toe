export default function Info() {
	return (
		<div className="left-info">
			<h1 className="title">
				Super Tic-
				<br />
				Tac-Toe
			</h1>
			<p>
				This is a simple{" "}
				<a
					href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe"
					target="_blank"
				>
					super tic-tac-toe
				</a>{" "}
				player. It currently only allows local play but I&apos;m
				planning on adding other features soon.
			</p>
			<a
				className="github"
				href="https://github.com/ArazEstPrit/Super-Tic-Tac-Toe"
			>
				<img
					src={new URL(`./assets/github.svg`, import.meta.url).href}
					alt=""
				/>
			</a>
		</div>
	);
}

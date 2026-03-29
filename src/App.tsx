import { useState } from "react";
import "./App.css";

type Cell = "X" | "O" | null;

const WIN_LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: Cell[]): Cell {
  for (const [a, b, c] of WIN_LINES) {
    const s = squares[a];
    if (s && s === squares[b] && s === squares[c]) return s;
  }
  return null;
}

const initialBoard = (): Cell[] => Array(9).fill(null);

function App() {
  const [squares, setSquares] = useState<Cell[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const full = squares.every((s) => s !== null);
  const gameOver = winner !== null || full;

  function handleClick(i: number) {
    if (squares[i] !== null || gameOver) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(initialBoard());
    setXIsNext(true);
  }

  let status: string;
  if (winner) status = `${winner} wins`;
  else if (full) status = "Draw";
  else status = `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <main className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <p className="game-status" role="status" aria-live="polite">
        {status}
      </p>
      <div className="board" role="grid" aria-label="Tic tac toe board">
        {squares.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={["cell", cell === "X" && "cell-x", cell === "O" && "cell-o"]
              .filter(Boolean)
              .join(" ")}
            onClick={() => handleClick(i)}
            disabled={cell !== null || gameOver}
            aria-label={
              cell
                ? `${cell} in cell ${i + 1}`
                : `Empty cell ${i + 1}, ${xIsNext ? "X" : "O"} to play`
            }
          >
            {cell}
          </button>
        ))}
      </div>
      <button type="button" className="reset" onClick={reset}>
        New game
      </button>
    </main>
  );
}

export default App;

import { useState } from "react";

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

const cellBase =
  "m-0 flex h-20 w-20 items-center justify-center border-0 rounded-lg p-0 text-4xl font-bold leading-none transition-[background-color,transform] duration-150 active:scale-[0.97] disabled:cursor-default";

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
    <main className="mx-auto flex max-w-88 flex-col items-center gap-5 px-4 pb-12 pt-8">
      <h1 className="m-0 text-[1.75rem] font-semibold tracking-tight">Tic Tac Toe</h1>
      <p className="m-0 min-h-6 text-[1.05rem] font-medium text-neutral-700 dark:text-neutral-400" role="status" aria-live="polite">
        {status}
      </p>
      <div
        className="grid grid-cols-3 gap-1 rounded-xl bg-neutral-900 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:bg-black dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        role="grid"
        aria-label="Tic tac toe board"
      >
        {squares.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={[
              cellBase,
              "bg-white hover:bg-slate-50 dark:bg-zinc-800 dark:hover:bg-zinc-600",
              !cell && "text-neutral-900 dark:text-neutral-100",
              cell === "X" && "text-blue-600 dark:text-blue-400",
              cell === "O" && "text-red-600 dark:text-red-400",
            ]
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
      <button
        type="button"
        className="mt-1 cursor-pointer rounded-lg border border-transparent bg-white px-6 py-2.5 text-base font-medium text-neutral-900 shadow-sm transition-colors hover:border-blue-600 hover:bg-neutral-50 active:bg-neutral-200 dark:bg-zinc-800 dark:text-neutral-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-600"
        onClick={reset}
      >
        New game
      </button>
    </main>
  );
}

export default App;

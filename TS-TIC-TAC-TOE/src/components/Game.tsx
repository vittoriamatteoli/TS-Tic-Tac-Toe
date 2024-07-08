import { useState } from "react";
import "./game.css";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [board, setBoard] = useState<Board>(Array(9).fill(null));

  type Player = "O" | "X";
  type Cell = Player | null;
  type Board = Cell[];

  const handleClick = (index: number) => {
    if (board[index] === null) {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };
  const renderCell = (index: number) => (
    <div className="cell" onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  const renderRow = (rowIndex: number) => (
    <div className="row">
      {Array(3)
        .fill(null)
        .map((_, cellIndex) => renderCell(rowIndex * 3 + cellIndex))}
    </div>
  );
  return (
    <div className="game-board">
      {Array(3)
        .fill(null)
        .map((_, rowIndex) => renderRow(rowIndex))}
    </div>
  );
};

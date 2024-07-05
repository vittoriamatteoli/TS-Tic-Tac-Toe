import { useState } from "react";
import "./game.css";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [board, setBoard] = useState<Board>(Array(9).fill(null));

  type Player = "O" | "X";
  type Cell = Player | null;
  type Board = Cell[];

  return (
    <>
      <div className="game-board">
        <div className="row">
          <div className="cell" id="cell-0"></div>
          <div className="cell" id="cell-1"></div>
          <div className="cell" id="cell-2"></div>
        </div>
        <div className="row">
          <div className="cell" id="cell-3"></div>
          <div className="cell" id="cell-4"></div>
          <div className="cell" id="cell-5"></div>
        </div>
        <div className="row">
          <div className="cell" id="cell-6"></div>
          <div className="cell" id="cell-7"></div>
          <div className="cell" id="cell-8"></div>
        </div>
      </div>
    </>
  );
};

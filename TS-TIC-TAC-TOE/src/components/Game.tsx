import { useState } from "react";
import "./game.css";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [winner, setWinner] = useState<Player | null>(null);
  const [score, setScore] = useState<Score>([
    { player: "X", score: 0 },
    { player: "O", score: 0 },
  ]);

  type Player = "O" | "X";
  type Cell = Player | null;
  type Board = Cell[];
  type Score = {
    player: Player;
    score: number;
  }[];

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board: Board): Player | null => {
    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] === null) {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
        setScore((prevScore) =>
          prevScore.map((playerScore) =>
            playerScore.player === newWinner
              ? { ...playerScore, score: playerScore.score + 1 }
              : playerScore
          )
        );
        setTimeout(restartGame, 5000);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
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
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };
  const quitGame = () => {
    restartGame();
    setScore([
      { player: "X", score: 0 },
      { player: "O", score: 0 },
    ]);
  };

  return (
    <>
      <div className="game-board">
        <div className="rowPlayer">
          {score.map((playerScore) => (
            <div
              key={playerScore.player}
              className={`scoreCell ${
                playerScore.player === "X" ? "scoreCellX" : "scoreCellO"
              }`}
            >
              <p>Player {playerScore.player}</p>
              <span>{playerScore.score}</span>
            </div>
          ))}
        </div>
        {Array(3)
          .fill(null)
          .map((_, rowIndex) => renderRow(rowIndex))}
      </div>
      {winner ? <div className="winner">Winner: {winner}</div> : null}
      <button onClick={restartGame}>Restart Game</button>
      <button onClick={quitGame}>Quit Game</button>
    </>
  );
};

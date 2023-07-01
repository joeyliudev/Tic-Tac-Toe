import { useEffect, useState } from "react";
import "./App.css";
import "./modules/Head";
import Head from "./modules/Head";
import Board from "./modules/Gameboard";
import Score from "./modules/ScoreBoard";
import MoveHistory from "./modules/Entity";
import Modal from "./modules/Modal";
import useLocalStorage from "./modules/Store";

let stat: {
  player1: number;
  player2: number;
  ties: number;
};

stat = {
  player1: 0,
  player2: 0,
  ties: 0,
};

const defaultBackroundColor = "#1a2a32";
const fadeBackgroundColor = "#0c1319";

export default function App() {
  // background color for all page
  const [backgroundColor, setBackgroundColor] = useState(defaultBackroundColor);

  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const [gameStat, setGameStat] = useLocalStorage("gameState", stat);
  const [history, setHistory] = useLocalStorage(
    "moveHistory",
    new MoveHistory()
  );

  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [winner, setWinner] = useState<null | number>(null);

  /* update background effect. */
  useEffect(() => {
    document.documentElement.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  /* player moves */

  const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  function isPlayerWin(moves: Array<Number>): boolean {
    if (moves.length < 3) {
      return false;
    }

    let win = false;
    winningPatterns.forEach((pattern) => {
      if (pattern.every((v) => moves.includes(v))) {
        win = true;
        return;
      }
    });

    return win;
  }

  function onPlayerMove(sqaureId: number, currentPlayer: number) {
    // push the moves to store.

    const newHist = { ...history };
    currentPlayer === 1
      ? newHist.player1Moves.push(sqaureId)
      : newHist.player2Moves.push(sqaureId);

    setHistory(newHist);

    // if player1 win
    if (isPlayerWin(history.player1Moves)) {
      onGameEnd(1);
      return;
    }

    // if player2 win
    if (isPlayerWin(history.player2Moves)) {
      onGameEnd(2);
      return;
    }

    // if tie game.
    if (history.player1Moves.length + history.player2Moves.length === 9) {
      onGameEnd(null);
      return;
    }

    // update the turn indicator.
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  function onGameEnd(winner: null | number) {
    /* update winner */
    setWinner(winner);

    let newStat = {
      player1: gameStat.player1,
      player2: gameStat.player2,
      ties: gameStat.ties,
    };

    if (null === winner) {
      newStat.ties = newStat.ties + 1;
    } else if (1 === winner) {
      newStat.player1 = newStat.player1 + 1;
    } else {
      newStat.player2 = newStat.player2 + 1;
    }

    /* update statistic info */
    setGameStat(newStat);

    /* set game end flag to show modal */
    setGameEnd(true);

    /* update background color */
    setBackgroundColor(fadeBackgroundColor);

    console.log("we have a winner " + winner);
  }

  function resetGame() {
    /* update default player to player1 */
    setCurrentPlayer(1);

    /* clear move history */
    setHistory(new MoveHistory());

    /* set game end flag to hide modal */
    setGameEnd(false);

    /* clear winner */
    setWinner(null);

    /* update background color */
    setBackgroundColor(defaultBackroundColor);
  }

  function clearHistory() {
    resetGame();

    let newStat = {
      player1: 0,
      player2: 0,
      ties: 0,
    };

    setGameStat(newStat);
  }

  return (
    <>
      <div className="main">
        <div className="grid">
          <Head
            currentPlayer={currentPlayer}
            resetClickCallback={resetGame}
          ></Head>

          <Board
            onPlayerMove={(squareId, player) => onPlayerMove(squareId, player)}
            gameEndFlag={gameEnd}
            moveHistory={history}
          ></Board>

          <Score
            player1Count={gameStat.player1}
            player2Count={gameStat.player2}
            tiesCount={gameStat.ties}
          ></Score>
        </div>
      </div>

      {gameEnd && (
        <Modal
          winner={winner}
          newRound={resetGame}
          clearResults={clearHistory}
        ></Modal>
      )}
    </>
  );
}

import { useEffect } from "react";
import "./App.css";
import { stateChange } from "./modules/GameBoardSlice";
import Board from "./modules/Gameboard";
import "./modules/Head";
import Head from "./modules/Head";
import Modal from "./modules/Modal";
import Score from "./modules/ScoreBoard";
import { useAppDispatch, useAppSelector } from "./redux/Hooks";
import { GAME_STATE_KEY, loadState } from "./redux/LocalStorageMiddleware";

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
  let gameResult = useAppSelector(stat => stat.game.winner)

  let game = useAppSelector(stat => stat.game);
  const dispatch = useAppDispatch();

  /* update background effect. */
  useEffect(() => {
    if (gameResult === null) {
      document.documentElement.style.backgroundColor = defaultBackroundColor;
      document.body.style.backgroundColor = defaultBackroundColor;
    } else {
      document.documentElement.style.backgroundColor = fadeBackgroundColor;
      document.body.style.backgroundColor = fadeBackgroundColor;
    }
  }, [gameResult]);

  /* gameState sync in multi tabs */
  useEffect(() => {

    function handleStorageChange(e: StorageEvent) {
      if (e.key === GAME_STATE_KEY) {
        dispatch(stateChange(loadState()));
      }
    }

    window.addEventListener('storage', handleStorageChange);

    // remove the listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, [game]);

  return (
    <>
      <div className="main">
        <div className="grid">
          <Head
          ></Head>

          <Board
          ></Board>

          <Score
          ></Score>
        </div>
      </div>

      {gameResult && (
        <Modal
        ></Modal>
      )}
    </>
  );
}

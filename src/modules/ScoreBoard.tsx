import "./ScoreBoard.css";

import { useAppSelector } from '../redux/Hooks'
import { GameState } from "./GameBoardSlice";


export default function Score() {

  const game = useAppSelector<GameState>(state => state.game)

  return (
    <>
      <Player1Score count={game.player1Wins}></Player1Score>
      <TiesScore count={game.ties}></TiesScore>
      <Player2Score count={game.player2Wins}></Player2Score>
    </>
  );
}

interface Props {
  count: number;
}

function Player1Score({ count }: Props) {
  return (
    <>
      <div className="scoreBoardLayout">
        <div className="scoreBoardContainer player1Score shadow medium-border-radius">
          <div>
            <p className="titleFont small-font">X (YOU)</p>
            <p className="countFont medium-font">{count}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Player2Score({ count }: Props) {
  return (
    <>
      <div className="scoreBoardLayout">
        <div className="scoreBoardContainer player2Score shadow medium-border-radius">
          <div>
            <p className="titleFont small-font">O (CPU)</p>
            <p className="countFont medium-font">{count}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function TiesScore({ count }: Props) {
  return (
    <>
      <div className="scoreBoardLayout">
        <div className="scoreBoardContainer tiesScore shadow medium-border-radius">
          <div>
            <p className="titleFont small-font">TIES</p>
            <p className="countFont medium-font">{count}</p>
          </div>
        </div>
      </div>
    </>
  );
}

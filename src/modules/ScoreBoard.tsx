import "./ScoreBoard.css";

interface ScoreProps {
  player1Count: number;
  player2Count: number;
  tiesCount: number;
}

export default function Score({
  player1Count,
  player2Count,
  tiesCount,
}: ScoreProps) {
  return (
    <>
      <Player1Score count={player1Count}></Player1Score>
      <TiesScore count={tiesCount}></TiesScore>
      <Player2Score count={player2Count}></Player2Score>
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
        <div className="scoreBoardContainer player1Score shadow">
          <div>
            <p className="titleFont">X (YOU)</p>
            <p className="countFont">{count}</p>
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
        <div className="scoreBoardContainer player2Score shadow">
          <div>
            <p className="titleFont">O (CPU)</p>
            <p className="countFont">{count}</p>
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
        <div className="scoreBoardContainer tiesScore shadow">
          <div>
            <p className="titleFont">TIES</p>
            <p className="countFont">{count}</p>
          </div>
        </div>
      </div>
    </>
  );
}

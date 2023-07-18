import classNames from "classnames";
import "./Modal.css";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { clear, resetGame } from "./GameBoardSlice";


export default function Modal() {
  const winner = useAppSelector(state => state.game.winner);
  let msg = winner !== null ? (winner === 'tie' ? 'TIE GMAE!' : 'YOU WON!') : null;

  return (

    <div className="modalStylye">
      <div className="greet medium-font">
        {winner !== null && <p>{msg}</p>}
      </div>

      {winner !== 'tie' && (
        <div className="winnerSign">
          <WinnerMsg winner={winner}></WinnerMsg>
        </div>
      )}

      <div className="buttonLayout">
        <Quit></Quit>
        <NextRound></NextRound>
      </div>
    </div>
  );
}

interface WinnerMsgProp {
  winner: null | string;
}

function WinnerMsg({ winner }: WinnerMsgProp) {
  return (
    <>
      <span
        className={classNames(
          "fa-sharp",
          "fa-solid",
          "medium-icon-size",
          "logoPlaceHolder",
          winner === 'player1' ? "turquoise" : "yellow",
          winner === 'player1' ? "fa-x" : "fa-o"
        )}
      ></span>
      <span
        className={classNames(
          "message large-font",
          winner === 'player2' ? "turquoise" : "yellow"
        )}
      >
        TAKES THE ROUND
      </span>
    </>
  );
}



function Quit() {
  const dispatch = useAppDispatch();

  return (
    <div
      className="buttonStyle shadow quitStyle medium-font medium-border-radius"
      onClick={() => dispatch(clear("clear"))}
    >
      QUIT
    </div>
  );
}


function NextRound() {
  const dispatch = useAppDispatch();
  return (
    <div
      className="buttonStyle shadow nextRoundStyle medium-font medium-border-radius"
      onClick={() => dispatch(resetGame("rest"))}
    >
      NEXT ROUND
    </div>
  );
}

import classNames from "classnames";
import "./Modal.css";
interface ModalProp {
  winner: null | number;
  newRound: () => void;
  clearResults: () => void;
}

export default function Modal({ winner, newRound, clearResults }: ModalProp) {
  return (
    <div className="modalStylye">
      <div className="modalContentContainer">
        <div className="greet">
          {winner != null ? <p>YOU WON</p> : <p>TIE GMAE</p>}
        </div>

        <div className="winnerSign">
          <WinnerMsg winner={winner}></WinnerMsg>
        </div>

        <div className="buttonLayout">
          <Quit clearResults={clearResults}></Quit>
          <NextRound newRound={newRound}></NextRound>
        </div>
      </div>
    </div>
  );
}

interface WinnerMsgProp {
  winner: null | number;
}

function WinnerMsg({ winner }: WinnerMsgProp) {
  if (null != winner) {
    return (
      <>
        <span
          className={classNames(
            "fa-sharp",
            "fa-solid",
            "fa-4x",
            "logoPlaceHolder",
            winner === 1 ? "turquoise" : "yellow",
            winner === 1 ? "fa-x" : "fa-o",
            winner === 1 ? "modal-bold-turquoise" : "modal-bold-yellow"
          )}
        ></span>
        <span
          className={classNames(
            "message",
            winner === 1 ? "turquoise" : "yellow"
          )}
        >
          TAKES THE ROUND
        </span>
      </>
    );
  } else {
    return <div></div>;
  }
}

interface QuitProp {
  clearResults: () => void;
}

function Quit({ clearResults }: QuitProp) {
  return (
    <div
      className="buttonStyle shadow quitStyle"
      onClick={() => clearResults()}
    >
      QUIT
    </div>
  );
}

interface NextRoundProp {
  newRound: () => void;
}

function NextRound({ newRound }: NextRoundProp) {
  return (
    <div
      className="buttonStyle shadow nextRoundStyle"
      onClick={() => newRound()}
    >
      NEXT ROUND
    </div>
  );
}

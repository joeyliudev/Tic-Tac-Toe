import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { clear, currentPlayer } from "./GameBoardSlice";
import "./Head.css";

export default function Head() {
  return (
    <>
      <Logo></Logo>
      <Indicator></Indicator>
      <RestButton></RestButton >
    </>
  );
}

function Logo() {
  return (
    <div className="headerBox">
      <div className="logoLayout">
        <div className="logoStyle">
          <i className="fa-sharp fa-solid fa-x medium-icon-size turquoise logo-margin"></i>
          <i className="fa-sharp fa-solid fa-o medium-icon-size yellow logo-margin"></i>
        </div>
      </div>
    </div>
  );
}

function Indicator() {
  const moves = useAppSelector(state => state.game.history);
  let player = currentPlayer(moves)

  return (
    <div className="headerBox">
      <div className="shadow indicatorLayout small-border-radius">
        <div className="indicator">
          <i
            className={classNames(
              "fa-sharp",
              "fa-solid",
              "small-icon-size",
              "logo-margin",
              "light-gray",
              player === 1 ? "fa-x" : "fa-o"
            )}
          ></i>
          <span className="turn medium-font">TURN</span>
        </div>
      </div>
    </div>
  );
}

function RestButton() {

  const dispatch = useAppDispatch();

  return (
    <div className="headerBox">
      <div className="restButtonLayout">
        <div
          className="resetButtonStyle shadow medium-font small-border-radius"
          onClick={() => dispatch(clear('reset'))}
        >
          <i className="fa-sharp fa-solid fa-arrow-rotate-right dark-gray"></i>
        </div>
      </div>
    </div>
  );
}

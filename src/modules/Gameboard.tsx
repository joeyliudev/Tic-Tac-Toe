import { useState } from "react";
import "./Gameboard.css";
import MoveHistory from "./Entity";

interface BoardProp {
  onPlayerMove: (squareId: number, playerId: number) => void;
  gameEndFlag: boolean;
  moveHistory: MoveHistory;
}

export default function Board({
  onPlayerMove,
  gameEndFlag,
  moveHistory,
}: BoardProp) {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {ids.map((id, _) => (
        <Square
          key={id}
          id={id}
          playerMoveCallback={(squareId: number, playerId: number) =>
            onPlayerMove(squareId, playerId)
          }
          clickAble={!gameEndFlag}
          moveHistory={moveHistory}
        ></Square>
      ))}
    </>
  );
}

interface SquareProp {
  id: number;
  clickAble: boolean;
  playerMoveCallback: (squareId: number, playerId: number) => void;
  moveHistory: MoveHistory;
}

function currentPlayer(moveHistory: MoveHistory): number {
  if (moveHistory.player1Moves.length === moveHistory.player2Moves.length) {
    return 1;
  } else if (
    moveHistory.player1Moves.length > moveHistory.player2Moves.length
  ) {
    return 2;
  } else {
    return 1;
  }
}

function Square({
  id,
  clickAble,
  playerMoveCallback,
  moveHistory,
}: SquareProp) {
  const myId = id;
  let p1 = moveHistory.player1Moves.filter((v) => v === myId).length > 0;
  let p2 = moveHistory.player2Moves.filter((v) => v === myId).length > 0;

  function onSquareClick() {
    if (p1 || p2) {
      return;
    }

    playerMoveCallback(myId, currentPlayer(moveHistory));
  }

  return (
    <div
      className="GameBoardContainer shadow large-border-radius"
      onClick={clickAble ? onSquareClick : () => {}}
    >
      {p1 && (
        <i className="fa-sharp fa-solid fa-x large-icon-size turquoise"></i>
      )}
      {p2 && <i className="fa-sharp fa-solid fa-o large-icon-size yellow"></i>}
    </div>
  );
}

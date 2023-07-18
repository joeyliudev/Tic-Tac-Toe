import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { PlayerMove, playerMoves } from "./GameBoardSlice";
import "./Gameboard.css";


export default function Board() {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {ids.map((id, _) => (
        <Square
          key={id}
          sqaureId={id}
        ></Square>
      ))}
    </>
  );
}

interface SquareProp {
  sqaureId: number
}

function Square({ sqaureId }: SquareProp) {
  const dispatch = useAppDispatch();
  const history = useAppSelector<PlayerMove[]>(state => state.game.history)
  let p1 = history.filter(it => it.player === 1 && it.square === sqaureId).length > 0;
  let p2 = history.filter(it => it.player === 2 && it.square === sqaureId).length > 0;

  return (
    <div
      className="GameBoardContainer shadow large-border-radius"
      onClick={() => dispatch(playerMoves(sqaureId))}
    >
      {p1 && (
        <i className="fa-sharp fa-solid fa-x large-icon-size turquoise"></i>
      )}
      {p2 && <i className="fa-sharp fa-solid fa-o large-icon-size yellow"></i>}
    </div>
  );
}

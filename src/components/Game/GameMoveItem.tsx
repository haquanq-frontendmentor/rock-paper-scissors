import { useGameStore, type GameMove } from "../../stores/gameStore";
import { GameMoveButton } from "./GameMoveButton";

interface GameMoveItemProps {
  move: GameMove;
  angle: number;
}

export const GameMoveItem = ({ move, angle }: GameMoveItemProps) => {
  const setPlayerSelectedMove = useGameStore((state) => state.setPlayerSelectedMove);

  const handleClick = () => {
    setPlayerSelectedMove(move);
  };

  return (
    <li style={{ transform: `rotate(${angle}deg)` }}>
      <div
        className="absolute h-full w-full"
        style={{
          transform: `rotate(${-angle}deg)`,
        }}
      >
        <div className="absolute bottom-1/2 left-1/2 flex h-200 w-2 -translate-x-1/2 md:w-3">
          <div
            className="w-full shrink-0"
            style={{
              background: `linear-gradient(60deg,${move.colors.map((v) => "rgb(" + v.join(",") + ")").join(",")})`,
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          transform: `rotate(${-angle}deg)`,
        }}
      >
        <GameMoveButton move={move} onClick={handleClick} />
      </div>
    </li>
  );
};

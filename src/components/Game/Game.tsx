import { GameBoard } from "./GameBoard";
import { GameScore } from "./GameScore";

export const Game = () => {
  return (
    <div>
      <GameScore />
      <GameBoard />
    </div>
  );
};

import { useGameStore } from "../../stores/gameStore";
import { GameMoveList } from "./GameMoveList";
import { GameResult } from "./GameResult";
import { GameRules } from "./GameRules";

export const GameBoard = () => {
  const gameStore = useGameStore();

  return (
    <section className="relative z-50 flex flex-col items-center overflow-hidden pb-20">
      <h2 className="sr-only">Pick between {gameStore.moves.map((v) => v.name).join(", ")}</h2>
      <GameResult />
      <GameMoveList />
      <GameRules />
    </section>
  );
};

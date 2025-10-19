import { useEffect } from "react";
import { useGameStore } from "../../stores/gameStore";
import { Button } from "../common/Button";
import { GameMoveButton } from "./GameMoveButton";

export const GameResult = () => {
  const gameStore = useGameStore();

  const handlePlayAgainClick = () => {
    gameStore.setPlayerSelectedMove(null);
  };

  useEffect(() => {
    gameStore.checkResult();
  }, [gameStore.playerSelectedMove]);

  if (!gameStore.houseSelectedMove || !gameStore.playerSelectedMove) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center gap-10 py-12 text-center text-gray-800 uppercase [--size:8rem] *:relative dark:text-gray-50">
      <div
        className="grid grid-cols-2 content-center gap-10 text-xl text-nowrap text-gray-700 *:flex *:aspect-square *:w-(--size) *:flex-col *:items-center *:gap-6 dark:text-gray-100"
        aria-hidden="true"
      >
        <div className="">
          <GameMoveButton move={gameStore.playerSelectedMove} disabled />
          <p>You picked</p>
        </div>

        <div>
          <GameMoveButton move={gameStore.houseSelectedMove} disabled />
          <p>House picked</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="pb text-5xl">{gameStore.result}</p>
        <Button variant="solid" onClick={handlePlayAgainClick}>
          Play again
        </Button>
      </div>
    </div>
  );
};

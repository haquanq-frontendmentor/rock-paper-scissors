import { useGameStore } from "../../stores/gameStore";
import { GameMoveItem } from "./GameMoveItem";

export const GameMoveList = () => {
  const gamseStore = useGameStore();

  if (gamseStore.houseSelectedMove && gamseStore.playerSelectedMove) {
    return null;
  }

  return (
    <div className="py-[calc(var(--size)*2)] pt-16 [--size:clamp(6rem,4.1221rem+8.0123vw,9.25rem)]">
      <ul className="relative aspect-square w-(--size) rounded-full *:absolute *:inset-0 *:h-full *:w-full *:origin-[center_calc(var(--size)*1.6))] *:rounded-[inherit] *:nth-[2]:z-50">
        {gamseStore.moves.map((move, index) => (
          <GameMoveItem move={move} angle={(360 / gamseStore.moves.length) * index} key={index + move.name} />
        ))}
      </ul>
      <div className="h-12"></div>
    </div>
  );
};

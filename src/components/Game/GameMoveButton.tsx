import ColorThief from "colorthief";
import { useEffect, useRef } from "react";
import { useGameStore, type GameMove } from "../../stores/gameStore";
import { cn } from "../../utils/cn";

interface GameMoveButtonProps {
  move: GameMove;
  onClick?: () => void;
  disabled?: boolean;
}

export const GameMoveButton = ({ move, onClick, disabled }: GameMoveButtonProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const setColor = useGameStore((state) => state.setMoveColors);

  const colorPalette = move.colors.map((v) => "rgb(" + v.join(",") + ")").join(",");

  useEffect(() => {
    if (!imageRef.current) return;
    const image = imageRef.current as HTMLImageElement;
    const handleImageLoad = () => {
      const thief = new ColorThief();
      setColor(move.name, thief.getPalette(image), thief.getColor(image));
    };
    image.addEventListener("load", handleImageLoad);

    return () => {
      image.removeEventListener("load", handleImageLoad);
    };
  }, []);

  return (
    <button
      className={cn(
        "group relative z-50 aspect-square h-full w-full items-center justify-center rounded-full p-[8%] shadow-lg focus-visible:outline-none",
      )}
      disabled={disabled}
      aria-label={move.name}
      onClick={onClick}
    >
      <span className="relative z-50 flex h-full w-full items-center justify-center overflow-hidden rounded-full shadow-lg transition-[scale] duration-300 group-hover:scale-110">
        <span
          className={cn(
            "block aspect-square w-full animate-[spin_2s_ease_alternate_infinite] rounded-full blur-sm duration-[3s]",
          )}
          style={{ background: `conic-gradient(${colorPalette})` }}
        ></span>

        <span className="absolute inset-1 z-10 rounded-full bg-gray-50"></span>
        <img className="absolute z-50 h-1/2 object-contain" src={move.icon} alt="" ref={imageRef} />
      </span>
      <span
        className="absolute inset-0 z-30 overflow-hidden rounded-[inherit] transition-[scale] delay-75 duration-300 group-hover:scale-110 group-focus-visible:outline-4 group-focus-visible:outline-offset-4 group-focus-visible:outline-dashed"
        style={{
          backgroundColor: move.dominantColor ? `rgba(${move.dominantColor.join(",")},0.75)` : undefined,
          outlineColor: move.dominantColor ? `rgba(${move.dominantColor.join(",")},1)` : undefined,
        }}
      ></span>
    </button>
  );
};

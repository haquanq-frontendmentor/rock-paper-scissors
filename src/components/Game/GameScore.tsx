import { ScoreBackgroundDark, ScoreBackgroundLight } from "../../assets/images";
import { useGameStore } from "../../stores/gameStore";
import { useThemeStore } from "../../stores/themeStore";
import { cn } from "../../utils/cn";

export const GameScore = () => {
  const theme = useThemeStore((state) => state.theme);
  const gameStore = useGameStore();

  return (
    <div className="relative z-[100] overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm dark:border-gray-100">
      <img
        className={cn(
          "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300",
          theme === "light" && "opacity-100",
        )}
        src={ScoreBackgroundLight}
        alt=""
      />
      <img
        className={cn(
          "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300",
          theme === "dark" && "opacity-100",
        )}
        src={ScoreBackgroundDark}
        alt=""
      />
      <div className="relative z-50 flex justify-between p-4 text-gray-50 uppercase [background:linear-gradient(90deg,rgba(0,0,0,0.65)0%,rgba(191,191,191,0.47)43%,rgba(28,28,28,0.29)100%)]">
        <ul className="text-2xl leading-none">
          {gameStore.moves.map((move, index) => (
            <li key={index + move.name}>{move.name}</li>
          ))}
        </ul>
        <div className="flex h-full min-w-[clamp(5rem,2.6145rem+10.1781vw,7.5rem)] flex-col items-center gap-2 rounded-lg bg-gray-50 p-4 text-gray-900 shadow-lg inset-shadow-sm">
          <h2 className="text-navy-800 tracking-wide">Score</h2>
          <p className="text-[4rem] font-bold">{gameStore.score}</p>
        </div>
      </div>
    </div>
  );
};

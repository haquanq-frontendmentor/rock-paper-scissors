import { useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "../common/Button";
import { GameRulesModal } from "./GameRulesModal";

export const GameRules = () => {
  const rulesButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="pt-4">
      <Button variant="outlined" className="w-28" ref={rulesButtonRef}>
        Rules
      </Button>
      {createPortal(<GameRulesModal trigger={rulesButtonRef} />, document.body)}
    </div>
  );
};

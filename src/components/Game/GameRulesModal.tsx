import { useEffect, useState } from "react";
import { useGameStore } from "../../stores/gameStore";
import { Button } from "../common/Button";

interface GameRulesModalProps {
  trigger: React.RefObject<HTMLButtonElement | null>;
}

export const GameRulesModal = ({ trigger }: GameRulesModalProps) => {
  const [open, setOpen] = useState(false);
  const gamseStore = useGameStore();

  const handleBackdropClick = () => {
    setOpen(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleContentKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const handleCloseButtonKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!trigger.current) return;
    const triggerButton = trigger.current as HTMLButtonElement;
    const handleTriggerClick = () => {
      setOpen(true);
    };
    triggerButton.addEventListener("click", handleTriggerClick);
    return () => {
      triggerButton.removeEventListener("click", handleTriggerClick);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }, [open]);

  if (!open) return null;

  return (
    <section
      className="fixed inset-0 z-[999] overflow-y-scroll py-22 [background:rgba(0,0,0,0.25)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-label"
      aria-describedby="modal-description"
      onClick={handleBackdropClick}
    >
      <div
        className="relative mx-auto flex w-[min(100vw-3rem,25rem)] flex-col items-center rounded-2xl bg-gray-50 px-6 py-8"
        onClick={handleContentClick}
        onKeyDown={handleContentKeydown}
      >
        <h2 className="pb-6 text-center text-3xl font-bold text-gray-900 uppercase" id="modal-label">
          Rules
        </h2>
        <p className="sr-ony leading-6" id="modal-description">
          {gamseStore.getRules().replaceAll(".", "\br")}
        </p>
        <Button
          variant="outlined"
          className="mt-12 w-24 border-gray-800 text-gray-800 focus-visible:outline-gray-800 dark:border-gray-800 dark:text-gray-800"
          onClick={handleCloseClick}
          onKeyDown={handleCloseButtonKeydown}
          type="button"
        >
          Close
        </Button>
      </div>
    </section>
  );
};

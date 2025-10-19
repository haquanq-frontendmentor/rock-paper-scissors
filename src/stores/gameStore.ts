import { create } from "zustand";
import { CandyIcon, FrankensteinIcon, PumpkinIcon, SkullIcon, VampireIcon } from "../assets/images";
import { getRandomInt } from "../utils/getRandomInt";

const INITIAL_SCORE = 0;

type RGBColorCodes = [number, number, number];

type GameMove = {
    name: string;
    icon: string;
    colors: RGBColorCodes[];
    dominantColor: RGBColorCodes | null;
};

interface GameStoreState {
    score: number;
    playerSelectedMove: null | GameMove;
    setPlayerSelectedMove: (move: GameMove | null) => void;
    houseSelectedMove: null | GameMove;
    moves: GameMove[];
    setMoveColors: (name: string, colors: RGBColorCodes[], dominantColor?: RGBColorCodes) => void;
    getRules: () => string;
    result: string;
    checkResult: () => void;
}

const getCircularIndex = (index: number, steps: number, limit: number) => {
    return (index + (steps += limit)) % limit;
};

const useGameStore = create<GameStoreState>()((set, get) => ({
    score: INITIAL_SCORE,
    result: "",
    checkResult: () => {
        const { playerSelectedMove, houseSelectedMove, moves } = get();
        if (!playerSelectedMove || !houseSelectedMove) return "Nil";

        let result = "You loose";
        let scoreDiff = -1;

        if (playerSelectedMove.name === houseSelectedMove.name) {
            result = "Draw";
            scoreDiff = 0;
        }

        const playerMoveIndex = moves.findIndex((v) => v.name === playerSelectedMove.name);
        const houseMoveIndex = moves.findIndex((v) => v.name === houseSelectedMove.name);

        if (
            houseMoveIndex === getCircularIndex(playerMoveIndex, 1, moves.length) ||
            houseMoveIndex === getCircularIndex(playerMoveIndex, 3, moves.length)
        ) {
            result = "You win";
            scoreDiff = 1;
        }

        set((state) => ({ ...state, score: state.score + scoreDiff, result }));
    },
    playerSelectedMove: null,
    setPlayerSelectedMove(move) {
        set((state) => ({
            ...state,
            playerSelectedMove: move,
            houseSelectedMove: state.moves[getRandomInt(0, state.moves.length)],
        }));
    },
    houseSelectedMove: null,
    setMoveColors(name, colors, dominantColor) {
        set((state) => ({
            ...state,
            moves: state.moves.map((v) =>
                v.name === name ? { ...v, colors, dominantColor: dominantColor ? dominantColor : null } : v,
            ),
        }));
    },
    moves: [
        { name: "Pumpkin", icon: PumpkinIcon, colors: [], dominantColor: null },
        { name: "Vampire", icon: VampireIcon, colors: [], dominantColor: null },
        { name: "Death", icon: SkullIcon, colors: [], dominantColor: null },
        { name: "Candy", icon: CandyIcon, colors: [], dominantColor: null },
        { name: "Frankenstein", icon: FrankensteinIcon, colors: [], dominantColor: null },
    ],
    getRules: () => {
        const moves = get().moves;

        let rules = "";

        moves.forEach((move, index) => {
            rules += `${move.name} beats ${moves[getCircularIndex(index, 1, moves.length)].name} and ${moves[getCircularIndex(index, 3, moves.length)].name}. `;
        });

        return rules;
    },
}));

export { useGameStore, type GameMove, type RGBColorCodes };

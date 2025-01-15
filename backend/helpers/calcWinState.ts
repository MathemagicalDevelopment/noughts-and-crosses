import { GameState, WinnerState } from "../types";

const winArrays = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
];
// positions chosen for a player matches ALL positions for a winning array
const hasWin = (positions: number[]) => winArrays.some((winArray) => winArray.every((position) => positions.includes(position)));

const calcWinState = (gameState:GameState): WinnerState => {
    const xPositions = gameState.filter((position) => position.value === 'X').map((position) => position.position);
    const oPositions = gameState.filter((position) => position.value === 'O').map((position) => position.position);
    // not enough moves
    if (xPositions.length < 3 && oPositions.length < 3) return null;
    // check if X has won
    if (hasWin(xPositions)) return 'X';
    // check if O has won
    if (hasWin(oPositions)) return 'O';
    // draw state, only calc if all consumed
    if (xPositions.length + oPositions.length === 9 && gameState.every((position) => position.value !== null)) return 'draw';
    // no win, no lose, no draw
    return null;
}

export default calcWinState;

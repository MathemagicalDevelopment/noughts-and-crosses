export type Player = 'X' | 'O';

export type WinnerState= Player | 'draw' | null;

type CellValue = Player | null;

type Cell = {
    position: number,
    value: CellValue
}
export type GameState = Cell[];

export type LiveGame = {
    gameId: string,
    players: string[],
}

export type LiveGameState = {
    gameId: string,
    gameState: GameState,
    currentPlayerTurn: Player
}
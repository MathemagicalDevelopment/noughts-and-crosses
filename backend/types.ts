type Player = 'X' | 'O';

type CellValue = Player | null;

type Cell = {
    position: number,
    value: CellValue
}

export type LiveGame = {
    gameId: string,
    players: string[],
}

export type LiveGameState = {
    gameId: string,
    gameState: Cell[],
    currentPlayerTurn: Player
}
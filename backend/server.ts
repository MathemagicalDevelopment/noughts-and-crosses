import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import type { Request, Response } from 'express';
import { GameState, LiveGame, LiveGameState, Player, WinnerState } from './types';
import calcWinState from './helpers/calcWinState';

const app = express();
// use CORS as we'll be communicating with the frontend
app.use(cors());

const port = process.env.PORT || 3001;

// store the games in memory
let liveGames: LiveGame[] = [];
let liveGameStates: LiveGameState[] = [];

const createGame = (): string => {
    const gameId = Math.random().toString(24).substring(8);
    liveGames.push({ gameId, players: [] });
    return gameId;
}

const setGameState = (gameId: string, gameState: GameState, currentPlayerTurn: Player): void => {
    // game already exists so we need to update it
    if (liveGameStates.find((game) => game.gameId === gameId)) {
        liveGameStates = liveGameStates.map(game => game.gameId === gameId 
            ? { ...game, gameState, currentPlayerTurn }
            : game
        );
    } else {
        // new game so we can just add it
        liveGameStates.push({ gameId, gameState, currentPlayerTurn });
    }
}

const removeGame = (gameId: string): void => {
    liveGames = liveGames.filter(game => game.gameId !== gameId);
    liveGameStates = liveGameStates.filter(game => game.gameId !== gameId);
}

const updateGameState = (gameId: string, gameState:GameState, currentPlayerTurn: Player):{winState?:WinnerState,error?:string} => {
    // check gameId exists
    if (liveGameStates.find((game) => game.gameId === gameId)) {
        // 5 move min win condition
        if (gameState.length >= 4) {

            const winState:WinnerState = calcWinState(gameState);

            if (winState === null) {
                // no win or draw, game continues
                setGameState(gameId, gameState, currentPlayerTurn);
                return {  winState }
            } else {
                // win or draw, game ends
                removeGame(gameId);
                return {  winState }
            }
        } else {
            // not enough moves, game continues
            setGameState(gameId, gameState, currentPlayerTurn);
            return {  winState: null }
        }
    } else {
        return { error: 'gameId not found' }
    }
};

// create game endpoint
app.post('/create', (req: Request, res: Response) => {
    // create a new game and return the gameId
    const gameId = createGame();
    // also create default game state
    setGameState(gameId, [], 'X');
    // send new gameId to client
    res.json({ gameId });
})

app.listen(port, () => {
    console.log(`Naughts and crosses app listening on port ${port}`)
})
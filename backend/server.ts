import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import type {Request, Response} from 'express';
import { LiveGame, LiveGameState } from './types';

const app = express();
// use CORS as we'll be communicating with the frontend
app.use(cors());

const port = process.env.PORT || 3001;

// store the games in memory
let liveGames:LiveGame[] = [];
let liveGameStates:LiveGameState[] = [];

const createGame = ():string=>{
    const gameId = Math.random().toString(24).substring(8);
    liveGames.push({gameId,players:[]});
    return gameId;
}

// create game endpoint
app.post('/create',(req:Request,res:Response)=>{
    // create a new game and return the gameId
    const gameId = createGame();
    res.json({gameId});
})

app.listen(port, () => {
    console.log(`Naughts and crosses app listening on port ${port}`)
})
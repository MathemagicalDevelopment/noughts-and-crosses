import React, { ReactElement } from 'react'
import { GameState, Player } from '../types';
import { Cell, GameBoard } from './styles';

// board only clickable if it's the player's turn

type BoardProps = {
    isMyTurn: boolean;
    currentPlayerTurn: Player;
    gameState: GameState;
    handleMove: (position: number, player: Player) => void;
}

const Board = ({
    isMyTurn,
    currentPlayerTurn,
    gameState,
    handleMove
}: BoardProps): ReactElement =>
    <GameBoard disableClick={!isMyTurn}>
        {/* renders 9 items to the 3 col, 3 row grid */}
        {gameState && gameState.map(({ position, value }) => (
            <Cell
                key={position}
                onClick={() => value === null ? handleMove(position, currentPlayerTurn) : undefined}>
                {value}
            </Cell>
        ))}
    </GameBoard>


export default Board
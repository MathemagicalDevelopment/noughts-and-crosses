import React, { Fragment, useState } from 'react'
import { Container, GameTitle, Row, SmallTitle } from './styles';
import Board from './Board';
import { LiveGameState, Player } from '../types';
import { useNavigate, useParams } from 'react-router';
import { io } from 'socket.io-client';
import Modal, { ModalProps } from './Modal';

const newBoardState = Array.from({ length: 9 }, (_, i) => ({ position: i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, value: null }));

const Game = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [gameReady, setGameReady] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player | undefined>();
    const [liveGameState, setLiveGameState] = useState<LiveGameState | undefined>();
    const [modalDetails, setModalDetails] = useState<{ isOpen: boolean } & ModalProps>({ isOpen: false, winner: 'draw', handleClose: () => navigate('/') });
    if (!gameId) {
        navigate('/');
    }

    const socket = io();

    socket.on('connect', () => {
        if (!player)
            socket.emit('join game', gameId);
    });

    socket.on('player assigned', (player: Player) => {
        setPlayer(player);
    })

    socket.on('game ready', () => {
        setGameReady(true);
        if (gameId) setLiveGameState({ gameId, gameState: newBoardState, currentPlayerTurn: 'X' });
    });

    socket.on('game state', (gameState, winState) => {
        console.log(gameState, winState);
        setLiveGameState(prev => ({ ...prev, gameState, currentPlayerTurn: prev?.currentPlayerTurn === 'X' ? 'O' : 'X', gameId: prev?.gameId || '' }));
        if (winState) {
            // game over
            setModalDetails(prev => ({ ...prev, isOpen: true, winner: winState }));
        }
    });

    const handleUpdateMove = (position: number, player: Player) => {
        console.log('clicked');
        const newGameState = liveGameState?.gameState.map(cell => cell.position === position ? { ...cell, value: player } : cell);
        // update game state on server
        socket.emit('move', liveGameState?.gameId, newGameState);
    };


    return (
        <Fragment>
            {modalDetails.isOpen && <Modal {...modalDetails} />}
            <Container>
                {gameReady && liveGameState && <Row>
                    <GameTitle>{player === liveGameState?.currentPlayerTurn ? 'Your Turn' : `Waiting for ${liveGameState?.currentPlayerTurn} to move`}</GameTitle>
                </Row>}
                <Row>
                    {gameReady && liveGameState ? <Board
                        isMyTurn={liveGameState?.currentPlayerTurn === player} currentPlayerTurn={liveGameState?.currentPlayerTurn} gameState={liveGameState.gameState} handleMove={handleUpdateMove} /> : <SmallTitle>Waiting for players...</SmallTitle>}
                </Row>
            </Container>
        </Fragment>
    )
}

export default Game
import React, { Fragment, useState } from 'react'
import { Container, Row, SmallTitle } from './styles';
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

    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
        socket.emit('join game', gameId);
    });

    socket.on('player assigned', (player: Player) => {
        setPlayer(player);
    })

    socket.on('game ready', () => {
        setGameReady(true);
        if (gameId) setLiveGameState({ gameId, gameState: newBoardState, currentPlayerTurn: 'X' });
    });

    socket.on('move', (gameState, winState) => {
        setLiveGameState(gameState);
        if (winState) {
            // game over
            setModalDetails(prev => ({ ...prev, isOpen: true, winner: winState }));
        }
    })
    const handleUpdateMove = (position: number, player: Player) => {
        // update game state on server
        socket.emit('move', liveGameState?.gameId, liveGameState?.gameState, player, position);
    }


    return (
        <Fragment>
            {modalDetails.isOpen && <Modal {...modalDetails} />}
            <Container>
                <Row>
                    {gameReady && liveGameState ? <Board
                        isMyTurn={liveGameState?.currentPlayerTurn === player} currentPlayerTurn={liveGameState?.currentPlayerTurn} gameState={liveGameState.gameState} handleMove={handleUpdateMove} /> : <SmallTitle>Waiting for players...</SmallTitle>}
                </Row>
            </Container>
        </Fragment>
    )
}

export default Game
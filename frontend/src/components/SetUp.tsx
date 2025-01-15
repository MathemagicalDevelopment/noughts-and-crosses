import React, { ChangeEvent, Suspense, useState } from 'react'
import { Button, Col, Container, GameTitle, LoadingSpinner, Row, SmallTitle } from './styles'
import { useNavigate } from 'react-router';
import createNewGame from '../services/createNewGame';

const SetUp = () => {
    const [gameId, setGameId] = useState<string | undefined>();

    const navigate = useNavigate();

    const handleNavigation = (gameId: string): void => {
        if (gameId) navigate(`/online/${gameId}`);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setGameId(e.target.value);
    }

    const handleClick = (): void => {
        if (gameId) {
            // navigate to game
            handleNavigation(gameId);
        } else {
            // initiate gameId
            setGameId('');
        }
    }

    const createGame = async (): Promise<void> => {
        const { gameId } = await createNewGame();
        if (gameId) {
            handleNavigation(gameId);
        } else {
            alert('Error creating game')
        }
    }

    return (
        <Container>
            <GameTitle>Set-Up</GameTitle>
            <Row>
                <Col>
                    <SmallTitle>Online Play</SmallTitle>
                    <Suspense fallback={LoadingSpinner}>
                        <Button key={'game-create'} onClick={createGame}>Create Game</Button>
                        {typeof gameId === 'undefined' ? <input type="text" placeholder='Enter Game ID' value={gameId} onChange={handleChange} /> :
                            <Button key={'game-find'} onClick={handleClick}>{typeof gameId === 'undefined' ? `Find Game` : `Join`}</Button>}
                    </Suspense>
                </Col>
            </Row>
        </Container>
    )
}

export default SetUp

const createNewGame = async (): Promise<{ error?: string, gameId?: string }> => {
    const response = await fetch('http://localhost:3001/game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const { gameId }: { gameId } = await response.json();
    return !!gameId ? { error: 'Unable to create game' } : { gameId };
}
export default createNewGame;
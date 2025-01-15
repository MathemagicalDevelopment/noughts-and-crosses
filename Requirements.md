
Frontend needs:

- component to set-up game
    - must be able to create game
    - must be able to join existing game
    - creating game must then join game

- game board
    - game board contains 9 "items"
    - each "item" is either empty (null), X, or O
    - game is won when either:
        - diagonal "items" all same player type
        - vertical "items" all same player type
        - horizontal "items" all same player type
    - game is draw if:
        - no wins and all "items" used
- game
    - must display winner
    - must display draw
    - must assign players correctly


Backend needs:

- serve React app as static

- http end point to create game
    - must return `gameId`
    - must store `gameId`
    - must create new `gameState` for `gameId`

- websockets to handle game state
    - must assign players to correct game
    - must assign correct player types
    - must declare winner
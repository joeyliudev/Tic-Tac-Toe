import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../redux/LocalStorageMiddleware';

export interface PlayerMove {
    player: number,
    square: number,
}

export interface GameState {
    history: PlayerMove[],
    winner: string | null,
    player1Wins: number,
    player2Wins: number,
    ties: number
}

const initialState: GameState = loadState();

const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
];


export const GameBoardSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        playerMoves: (state, action: PayloadAction<number>) => {
            // Square already clicked.
            if (isFilled(state.history, action.payload)) {
                return state;
            }

            // Game is end.
            if (state.winner !== null) {
                return state;
            }

            // plaery X.
            let player = currentPlayer(state.history);

            state.history.push({ player: player, square: action.payload })
            state.winner = winner(state.history);
            if (state.winner === 'player1') {
                state.player1Wins = state.player1Wins + 1;
            } else if (state.winner === 'player2') {
                state.player2Wins = state.player2Wins + 1;
            } else if (state.winner === 'tie') {
                state.ties = state.ties + 1;
            }

            return state;
        },

        resetGame: (state, action: PayloadAction<string>) => {
            state.history = [];
            state.winner = null;
            return state;
        },

        clear: (state, action: PayloadAction<string>) => {
            state.player1Wins = 0;
            state.player2Wins = 0;
            state.ties = 0;
            state.winner = null;
            state.history = [];
            return state;
        },

        stateChange: (state, action: PayloadAction<GameState>) => {
            return action.payload;
        },

    }
});

export function currentPlayer(moves: PlayerMove[]): number {
    // plaery X.
    let player = 1;
    if (moves.length !== 0) {
        if (moves[moves.length - 1].player === 1) {
            player = 2;
        }
    }

    return player;
}

function isFilled(moves: PlayerMove[], squareId: number): boolean {
    if (moves.find(it => it.square === squareId)) {
        return true;
    }
    return false;
}

export function winner(moves: PlayerMove[]): string | null {

    let player1Moves = moves.filter(it => it.player === 1).map(it => it.square);
    let player2Moves = moves.filter(it => it.player === 2).map(it => it.square);

    if (player1Moves.length < 3 && player2Moves.length < 3) {
        return null;
    }

    if (isPlayerWin(player1Moves)) {
        return 'player1';
    }

    if (isPlayerWin(player2Moves)) {
        return 'player2'
    }

    if (moves.length === 9) {
        return 'tie';
    }

    return null;
}


function isPlayerWin(moves: Array<Number>): boolean {
    if (moves.length < 3) {
        return false;
    }

    let win = false;
    winningPatterns.forEach((pattern) => {
        if (pattern.every((v) => moves.includes(v))) {
            win = true;
            return;
        }
    });

    return win;
}

export const { playerMoves, resetGame, clear, stateChange } = GameBoardSlice.actions;

export default GameBoardSlice.reducer
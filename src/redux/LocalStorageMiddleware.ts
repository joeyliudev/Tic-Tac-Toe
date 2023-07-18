import { Middleware } from "@reduxjs/toolkit";
import { GameState } from "../modules/GameBoardSlice";

export const GAME_STATE_KEY = 'GAME_STATE_KEY';

export const loadState = (): GameState => {
    const initialState: GameState = {
        history: [],
        winner: null,
        player1Wins: 0,
        player2Wins: 0,
        ties: 0
    }

    try {
        const serializedState = localStorage.getItem(GAME_STATE_KEY)
        if (null === serializedState) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return initialState;
    }
}

const saveState = (state: GameState): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(GAME_STATE_KEY, serializedState);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const localStorageMiddleWare: Middleware = (storeApi) => (next) => (action) => {
    // 执行下一个middleware或者reducer
    const result = next(action);

    // 保存当前的state到localStorage
    saveState(storeApi.getState().game);

    // 返回action处理后的结果
    return result;
};
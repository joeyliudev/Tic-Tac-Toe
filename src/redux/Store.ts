import { Middleware, configureStore } from '@reduxjs/toolkit'
import reducer from '../modules/GameBoardSlice'
import { createLogger } from 'redux-logger'
import { localStorageMiddleWare } from './LocalStorageMiddleware';

const middleware: Middleware[] = [];

// ban redux-logger in production.
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

middleware.push(localStorageMiddleWare);

export const store = configureStore({
    reducer: {
        game: reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),

})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>

// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import moneyReducer from './moneySlice'

export const store = configureStore({
  reducer: {
    money: moneyReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
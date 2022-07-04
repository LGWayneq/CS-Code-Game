import { configureStore } from '@reduxjs/toolkit'
import moneyReducer from './slices/moneySlice'
import cpmsReducer from './slices/cpmsSlice'
import cpkReducer from './slices/cpkSlice'
import mplReducer from './slices/mplSlice'
import upgradesReducer from './slices/upgradesSlide'

export const store = configureStore({
  reducer: {
    money: moneyReducer,
    cpms: cpmsReducer,
    cpk: cpkReducer,
    mpl: mplReducer,
    upgrades: upgradesReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
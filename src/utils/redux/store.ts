import { configureStore } from '@reduxjs/toolkit'
import moneyReducer from './slices/moneySlice'
import cpsReducer from './slices/cpsSlice'
import cpkReducer from './slices/cpkSlice'
import mplReducer from './slices/mplSlice'
import upgradesReducer from './slices/upgradesSlide'
import tabsReducer from './slices/tabsSlice'
import dayStartReducer from './slices/dayStartSlice'

export const store = configureStore({
  reducer: {
    money: moneyReducer,
    cps: cpsReducer,
    cpk: cpkReducer,
    mpl: mplReducer,
    upgrades: upgradesReducer,
    tabs: tabsReducer,
    dayStart: dayStartReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
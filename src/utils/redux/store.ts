import { configureStore } from '@reduxjs/toolkit'
import moneyReducer from './slices/moneySlice'
import cpsReducer from './slices/cpsSlice'
import cpkReducer from './slices/cpkSlice'
import mplReducer from './slices/mplSlice'
import upgradesReducer from './slices/upgradesSlide'
import tabsReducer from './slices/tabsSlice'
import dayStartReducer from './slices/dayStartSlice'
import codingAreaReducer from './slices/codingAreaSlice'

function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("store", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("store");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    codingArea: codingAreaReducer,
    money: moneyReducer,
    cps: cpsReducer,
    cpk: cpkReducer,
    mpl: mplReducer,
    upgrades: upgradesReducer,
    tabs: tabsReducer,
    dayStart: dayStartReducer
  },
  preloadedState: loadFromLocalStorage()
})

store.subscribe(() => saveToLocalStorage(store.getState()))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import moneyReducer from './slices/moneySlice'
import cpsReducer from './slices/cpsSlice'
import cpkReducer from './slices/cpkSlice'
import mplReducer from './slices/mplSlice'
import upgradesReducer from './slices/upgradesSlice'
import tabsReducer from './slices/tabsSlice'
import dayStartReducer from './slices/dayStartSlice'
import codingAreaReducer from './slices/codingAreaSlice'
import projectsReducer from './slices/projectsSlice'
import settingsReducer from './slices/settingsSlice'
import sessionReducer from './slices/sessionSlice'
import { upgradesData } from '../../assets/upgradesData'

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
    if (serialisedState === null) {
      return undefined;
    }
    const loadedState = verifyHiringData(JSON.parse(serialisedState))
    return loadedState;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

function verifyHiringData(loadedState: any) {
  if (loadedState.upgrades.hiring.length != upgradesData.hiring.length) {
    const hiring = upgradesData.hiring.map((item, index) => {
      return ({
        id: index,
        name: item.name,
        qty: loadedState.upgrades.hiring[index]
          ? loadedState.upgrades.hiring[index].qty
          : 0
      })
    })
    loadedState.upgrades.hiring = hiring
  }
  return loadedState
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
    dayStart: dayStartReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    session: sessionReducer
  },
  preloadedState: loadFromLocalStorage()
})

store.subscribe(() => saveToLocalStorage(store.getState()))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
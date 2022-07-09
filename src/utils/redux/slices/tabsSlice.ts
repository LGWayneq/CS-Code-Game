import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface TabsState {
    value: number
}

const initialState: TabsState = {
    value: 2
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState: initialState,
    reducers: {
        incrementTabs: (state) => {
            state.value += 1
        },
        decrementTabsByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
        },
        resetTabs: (state) => {
            state.value = 1
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementTabs, decrementTabsByAmount, resetTabs } = tabsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTabs = (state: RootState) => state.tabs.value

export default tabsSlice.reducer
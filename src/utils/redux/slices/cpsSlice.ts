import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CpsState {
    value: number
}

const initialState: CpsState = {
    value: 0
}

export const cpsSlice = createSlice({
    name: 'cps',
    initialState: initialState,
    reducers: {
        incrementCpsByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        decrementCpsByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
        },
        resetCps: (state) => {
            state.value = 0
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementCpsByAmount, decrementCpsByAmount, resetCps } = cpsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCps = (state: RootState) => state.cps.value

export default cpsSlice.reducer
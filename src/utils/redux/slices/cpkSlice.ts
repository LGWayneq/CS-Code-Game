import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CpkState {
    value: number
}

const initialState: CpkState = {
    value: 1
}

export const cpkSlice = createSlice({
    name: 'cpk',
    initialState: initialState,
    reducers: {
        incrementCpkByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        decrementCpkByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementCpkByAmount, decrementCpkByAmount } = cpkSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCpk = (state: RootState) => state.cpk.value

export default cpkSlice.reducer
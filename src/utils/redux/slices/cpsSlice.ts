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
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {
            state.value -= action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, decrementByAmount } = cpsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCps = (state: RootState) => state.cps.value

export default cpsSlice.reducer
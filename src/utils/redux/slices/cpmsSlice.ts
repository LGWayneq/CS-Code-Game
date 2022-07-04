import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CpmsState {
    value: number
}

const initialState: CpmsState = {
    value: 0
}

export const cpmsSlice = createSlice({
    name: 'cpms',
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
export const { increment, decrement, incrementByAmount, decrementByAmount } = cpmsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCpms = (state: RootState) => state.cpms.value

export default cpmsSlice.reducer
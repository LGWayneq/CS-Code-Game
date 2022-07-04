import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CpkState {
    value: number
}

const initialState: CpkState = {
    value: 1
}

export const cpkSlice = createSlice({
    name: 'cpk',
    initialState: {
        value: 1
    },
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
export const { increment, decrement, incrementByAmount, decrementByAmount } = cpkSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectcpk = (state: RootState) => state.cpk.value

export default cpkSlice.reducer
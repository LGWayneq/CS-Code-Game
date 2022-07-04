import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface MplState {
    value: number
}

const initialState: MplState = {
    value: 1
}

export const mplSlice = createSlice({
    name: 'mpl',
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
export const { increment, decrement, incrementByAmount, decrementByAmount } = mplSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMpl = (state: RootState) => state.mpl.value

export default mplSlice.reducer
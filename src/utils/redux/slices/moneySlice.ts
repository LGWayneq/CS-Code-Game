import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FloatingPoint, subtract, sumOf } from '../../MoneyManager'
import type { RootState } from '../store'

interface MoneyState {
    value: FloatingPoint
}

const initialState: MoneyState = {
    value: {
        base: 1,
        exponent: 5
    }
}

export const moneySlice = createSlice({
    name: 'money',
    initialState: initialState,
    reducers: {
        incrementMoneyByAmount: (state, action: PayloadAction<FloatingPoint>) => {
            state.value = sumOf(state.value, action.payload)
        },
        decrementMoneyByAmount: (state, action: PayloadAction<FloatingPoint>) => {
            state.value = subtract(state.value, action.payload)
        },
        resetMoney: (state) => {
            state.value = {
                base: 0,
                exponent: 0
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementMoneyByAmount, decrementMoneyByAmount, resetMoney } = moneySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMoney = (state: RootState) => state.money.value

export default moneySlice.reducer
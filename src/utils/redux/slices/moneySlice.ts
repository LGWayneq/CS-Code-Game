import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ableToPurchase, FloatingPoint, subtract, sumOf } from '../../MoneyManager'
import type { RootState } from '../store'

interface MoneyState {
    lifetime: FloatingPoint
    value: FloatingPoint
}

const initialState: MoneyState = {
    lifetime: {
        base: 0,
        exponent: 0
    },
    value: {
        base: 0,
        exponent: 0
    }
}

export const moneySlice = createSlice({
    name: 'money',
    initialState: initialState,
    reducers: {
        incrementMoneyByAmount: (state, action: PayloadAction<FloatingPoint>) => {
            state.lifetime = sumOf(state.lifetime, action.payload)
            state.value = sumOf(state.value, action.payload)
        },
        decrementMoneyByAmount: (state, action: PayloadAction<FloatingPoint>) => {
            if (ableToPurchase(state.value, action.payload)) {
                state.value = subtract(state.value, action.payload)
            } else {
                state.value = { base: 0, exponent: 0 }
            }
        },
        resetMoney: (state) => {
            state.value = {
                base: 0,
                exponent: 0
            }
        },
        hardResetMoney: (state) => {
            state.lifetime = {
                base: 0,
                exponent: 0
            }
            state.value = {
                base: 0,
                exponent: 0
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementMoneyByAmount, decrementMoneyByAmount, resetMoney, hardResetMoney } = moneySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMoney = (state: RootState) => state.money.value

export default moneySlice.reducer
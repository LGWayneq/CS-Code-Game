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
            const increment: FloatingPoint = {
                base: action.payload.base,
                exponent: action.payload.exponent
            }
            state.lifetime = sumOf(state.lifetime, increment)
            state.value = sumOf(state.value, increment)
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
                base: 1,
                exponent: 20
            }
            state.value = {
                base: 1,
                exponent: 20
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementMoneyByAmount, decrementMoneyByAmount, resetMoney, hardResetMoney } = moneySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMoney = (state: RootState) => state.money.value

export default moneySlice.reducer
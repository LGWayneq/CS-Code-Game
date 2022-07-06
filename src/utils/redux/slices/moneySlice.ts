import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Money } from '../../MoneyManager'
import type { RootState } from '../store'

interface MoneyState {
    value: Money
}

const initialState: MoneyState = {
    value: {
        base: 0,
        exponent: 0
    }
}

export const moneySlice = createSlice({
    name: 'money',
    initialState: initialState,
    reducers: {
        incrementMoneyByAmount: (state, action: PayloadAction<Money>) => {
            //definitely wrong
            state.value.base += action.payload.base
            state.value.exponent += action.payload.exponent
        },
        decrementMoneyByAmount: (state, action: PayloadAction<Money>) => {
            //definitely wrong
            state.value.base -= action.payload.base
            state.value.exponent -= action.payload.exponent
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementMoneyByAmount, decrementMoneyByAmount } = moneySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMoney = (state: RootState) => state.money.value

export default moneySlice.reducer
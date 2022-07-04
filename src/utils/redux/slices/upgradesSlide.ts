import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { upgradesData } from '../../../assets/upgradesData'

interface HiringPayload {
    id: number,
    qty: number
}

interface UpgradeStateType {
    id: number,
    name: string,
    qty: number
}

interface UpgradesState {
    hiring: Array<UpgradeStateType>,
    keyboard: number,
    tabs: number,
}

const initialState: UpgradesState = {
    hiring: upgradesData.hiring.map((item, index) => {
        return (
            {
                id: index,
                name: item.name,
                qty: 0
            }
        )
    }),
    keyboard: 0,
    tabs: 0
}

export const upgradesSlice = createSlice({
    name: 'upgrades',
    initialState: initialState,
    reducers: {
        increaseHiringByAmount: (state, action: PayloadAction<HiringPayload>) => {
            state.hiring[action.payload.id].qty += action.payload.qty
        },
        increaseKeyboard: state => {
            state.keyboard += 1
        },
        increaseKeyboardByAmount: (state, action: PayloadAction<number>) => {
            state.keyboard += action.payload
        },
        increaseTabs: state => {
            state.tabs += 1
        },
        increaseTabsByAmount: (state, action: PayloadAction<number>) => {
            state.tabs += action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { increaseHiringByAmount, increaseKeyboard, increaseKeyboardByAmount, increaseTabs, increaseTabsByAmount } = upgradesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUpgrades = (state: RootState) => state.upgrades

export default upgradesSlice.reducer
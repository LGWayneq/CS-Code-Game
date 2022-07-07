import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { upgradesData } from '../../../assets/upgradesData'

interface HiringPayload {
    id: number,
    qty: number
}

interface HiringStateType {
    id: number,
    name: string,
    qty: number
}

interface UpgradesState {
    hiring: Array<HiringStateType>,
    isStandardUpgradePurchased: Array<boolean>
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
    isStandardUpgradePurchased: upgradesData.hiring.map((item, index) => {
        return false
    })
}

export const upgradesSlice = createSlice({
    name: 'upgrades',
    initialState: initialState,
    reducers: {
        increaseHiringByAmount: (state, action: PayloadAction<HiringPayload>) => {
            state.hiring[action.payload.id].qty += action.payload.qty
        },
        purchaseStandardUpgrade: (state, action: PayloadAction<number>) => {
            state.isStandardUpgradePurchased[action.payload] = true
        },
    }
})

// Action creators are generated for each case reducer function
export const { increaseHiringByAmount, purchaseStandardUpgrade } = upgradesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUpgrades = (state: RootState) => state.upgrades

export default upgradesSlice.reducer
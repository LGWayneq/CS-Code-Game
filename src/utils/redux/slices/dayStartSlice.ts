import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface DayStartState {
    value: string
}

const initialState: DayStartState = {
    value: new Date().toString()
}

export const dayStartSlice = createSlice({
    name: 'dayStart',
    initialState: initialState,
    reducers: {
        restartDay: (state) => {
            state.value = new Date().toString()
        },
    }
})

// Action creators are generated for each case reducer function
export const { restartDay } = dayStartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDayStart = (state: RootState) => state.dayStart.value

export default dayStartSlice.reducer
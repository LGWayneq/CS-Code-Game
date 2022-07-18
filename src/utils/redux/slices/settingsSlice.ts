import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface SettingsState {
    volume: number
}

const initialState: SettingsState = {
    volume: 50
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { setVolume } = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer
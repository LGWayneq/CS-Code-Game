import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface SessionState {
    lastFocused: string
}

const initialState: SessionState = {
    lastFocused: new Date().toString()
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {
        setLastFocused: (state, action: PayloadAction<string>) => {
            state.lastFocused = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { setLastFocused } = sessionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSession = (state: RootState) => state.session

export default sessionSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { startComment } from '../../../assets/codeContent'
import type { RootState } from '../store'

interface CodingAreaState {
    currentIndex: number,
    currentLine: number,
    residualChars: number
}

const initialState: CodingAreaState = {
    currentIndex: 1,
    currentLine: 0,
    residualChars: 0
}

export const codingAreaSlice = createSlice({
    name: 'codingArea',
    initialState: initialState,
    reducers: {
        setCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload
        },
        setCurrentLine: (state, action: PayloadAction<number>) => {
            state.currentLine = action.payload
        },
        setResidualChars: (state, action: PayloadAction<number>) => {
            state.residualChars = action.payload
        },
        resetCodingArea: (state) => {
            state.currentIndex = 1
            state.currentLine = 0
            state.residualChars = 0
        }
    }
})

// Action creators are generated for each case reducer function
export const { setCurrentIndex, setCurrentLine, setResidualChars, resetCodingArea } = codingAreaSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCodingArea = (state: RootState) => state.codingArea

export default codingAreaSlice.reducer
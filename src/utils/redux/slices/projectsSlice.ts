import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../../../assets/projectsData'
import { FloatingPoint } from '../../MoneyManager'
import type { RootState } from '../store'

export interface ProjectNoIcon {
    name: string
    requiredLines: number
    payout: FloatingPoint
    penalty: FloatingPoint
}

export interface ProjectsState {
    currentProject: ProjectNoIcon | null
    linesCompleted: number
    timeRemaining: number
}

const initialState: ProjectsState = {
    currentProject: null,
    linesCompleted: 0,
    timeRemaining: 30
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        startProject: (state, action: PayloadAction<ProjectNoIcon>) => {
            state.currentProject = action.payload
            state.linesCompleted = 0
            state.timeRemaining = 30    //currently set time for each project to be 30s
        },
        incrementLinesByAmount: (state, action: PayloadAction<number>) => {
            state.linesCompleted += action.payload
        },
        decrementTimeRemainingByAmount: (state, action: PayloadAction<number>) => {
            state.timeRemaining -= action.payload
        },
        resetProject: (state) => {
            state.currentProject = null
            state.linesCompleted = 0
            state.timeRemaining = 30    //currently set time for each project to be 30s
        }
    }
})

// Action creators are generated for each case reducer function
export const { startProject, incrementLinesByAmount, decrementTimeRemainingByAmount, resetProject } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects

export default projectsSlice.reducer
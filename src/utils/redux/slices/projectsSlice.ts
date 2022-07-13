import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../../../assets/projectsData'
import type { RootState } from '../store'

interface ProjectsState {
    currentProject: Project | null
    linesCompleted: number
    timeRemaining: number
}

const initialState: ProjectsState = {
    currentProject: null,
    linesCompleted: 0,
    timeRemaining: 60
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        startProject: (state, action: PayloadAction<Project>) => {
            state.currentProject = action.payload
            state.linesCompleted = 0
            state.timeRemaining = 5    //currently set time for each project to be 1 min
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
            state.timeRemaining = 5    //currently set time for each project to be 1 min
        }
    }
})

// Action creators are generated for each case reducer function
export const { startProject, incrementLinesByAmount, decrementTimeRemainingByAmount, resetProject } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects

export default projectsSlice.reducer
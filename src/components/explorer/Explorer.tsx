import { useState, useEffect } from 'react';
import { colours } from '../../assets/colours';
import { textStyles } from '../../assets/textStyles';
import { EXPLORER_WIDTH, TITLE_BAR_HEIGHT } from '../../assets/constants';
import HiringExplorer from './hiring/HiringExplorer';
import StandardExplorer from './keyboard/StandardExplorer';
import getWindowDimensions from '../../utils/WindowDimensions';
import ProjectsExplorer from './projects/ProjectsExplorer';
import EnddayExplorer from './endday/EnddayExplorer';
import SettingsExplorer from './settings/SettingsExplorer';
import InfoExplorer from './info/InfoExplorer';
import { Project, projectsData } from '../../assets/projectsData';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import { decrementTimeRemainingByAmount, incrementLinesByAmount, ProjectNoIcon, resetProject, startProject } from '../../utils/redux/slices/projectsSlice';
import { decrementMoneyByAmount, incrementMoneyByAmount } from '../../utils/redux/slices/moneySlice';
import { codeContent } from '../../assets/codeContent';

export enum ExplorerStates {
    HIRING,
    STANDARD,
    PROJECTS,
    ENDDAY,
    INFO,
    SETTINGS
}

interface ExplorerProps {
    explorerState: ExplorerStates
}

function Explorer(props: ExplorerProps) {
    const codingAreaState = useAppSelector(state => state.codingArea)
    const [prevIndex, setPrevIndex] = useState<number>(0)
    const projectState = useAppSelector(state => state.projects)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (projectState.currentProject != null) {
            if (projectState.linesCompleted < projectState.currentProject.requiredLines) {
                const linesIncrement = calculateLineIncrease(codingAreaState.currentIndex, prevIndex)
                dispatch(incrementLinesByAmount(linesIncrement))
            } else {
                dispatch(incrementMoneyByAmount(projectState.currentProject.payout))
                dispatch(resetProject())
            }
        }
        setPrevIndex(codingAreaState.currentIndex)
    }, [codingAreaState.currentIndex])

    useEffect(() => {
        const timer = setTimeout(() => handleReduceTime(), 1000)
        return () => clearTimeout(timer)
    }, [projectState.currentProject, projectState.timeRemaining])

    const calculateLineIncrease = (currentIndex: number, prevIndex: number) => {
        const contentChange = codeContent.slice(prevIndex, currentIndex)
        return contentChange.split("\n").length - 1
    }

    const handleReduceTime = () => {
        if (projectState.currentProject != null) {
            dispatch(decrementTimeRemainingByAmount(1))
            if (projectState.timeRemaining < 0 && projectState.linesCompleted < projectState.currentProject.requiredLines) {
                dispatch(decrementMoneyByAmount(projectState.currentProject.penalty))
            }
        }
    }

    const handleStartProject = (project: Project) => {
        const _project: ProjectNoIcon = {
            name: project.name,
            requiredLines: project.requiredLines,
            payout: project.payout,
            penalty: project.penalty,
        }
        dispatch(startProject(_project))
        setPrevIndex(codingAreaState.currentIndex)
    }
    
    return (
        <div style={{ ...styles.container, height: getWindowDimensions().height - TITLE_BAR_HEIGHT }}>
            <div style={{ ...styles.scrollBarHide, height: getWindowDimensions().height - TITLE_BAR_HEIGHT }} />
            {
                props.explorerState == ExplorerStates.HIRING &&
                <HiringExplorer />
            }
            {
                props.explorerState == ExplorerStates.STANDARD &&
                <StandardExplorer />
            }
            {
                props.explorerState == ExplorerStates.PROJECTS &&
                <ProjectsExplorer handleStartProject={(project: Project) => handleStartProject(project)}/>
            }
            {
                props.explorerState == ExplorerStates.ENDDAY &&
                <EnddayExplorer />
            }
            {
                props.explorerState == ExplorerStates.INFO &&
                <InfoExplorer />
            }
            {
                props.explorerState == ExplorerStates.SETTINGS &&
                <SettingsExplorer />
            }
        </div>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH,
        backgroundColor: colours.explorer,
        overflowY: 'scroll' as 'scroll',
        paddingLeft: 20,
        // paddingRight: 20,
    },
    scrollBarHide: {
        position: 'absolute' as 'absolute',
        width: 20,
        backgroundColor: colours.explorer,
        alignSelf: 'flex-start' as 'flex-start',
        marginLeft: EXPLORER_WIDTH - 38
    },
    qtyContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    qtyLabel: {
        ...textStyles.terminalLabel,
    },
    qty: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        cursor: 'pointer'
    }
}
import { useEffect, useState } from 'react';
import { Project, projectsData } from '../../../assets/projectsData';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppDispatch, useAppSelector } from '../../../utils/redux/hooks';
import ProjectCard from './ProjectCard';
import { decrementTimeRemainingByAmount, incrementLinesByAmount, ProjectNoIcon, resetProject, startProject } from '../../../utils/redux/slices/projectsSlice';
import { decrementMoneyByAmount, incrementMoneyByAmount } from '../../../utils/redux/slices/moneySlice';
import { codeContent } from '../../../assets/codeContent';
import CurrentProjectCard from './CurrentProjectCard';
import { ableToPurchase, multiply } from '../../../utils/MoneyManager';

function ProjectsExplorer() {
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
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>PROJECTS</p>
            <CurrentProjectCard projectState={projectState} />
            {projectsData.map((project, index) => {
                // if (ableToPurchase(lifetimeMoney, multiply(project.payout, 2)))
                return (
                    <ProjectCard
                        key={index}
                        index={index}
                        disabled={projectState.currentProject != null}
                        startProject={(project: Project) => handleStartProject(project)}
                        project={project} />
                )
            })}
        </div>
    );
}

export default ProjectsExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 50,
        backgroundColor: colours.explorer,
        paddingBottom: 20
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
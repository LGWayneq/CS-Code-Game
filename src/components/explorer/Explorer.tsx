import { useState, useEffect } from 'react';
import { colours } from '../../assets/colours';
import { textStyles } from '../../assets/textStyles';
import { EXPLORER_WIDTH, TITLE_BAR_HEIGHT } from '../../assets/constants';
import SideMenu from './SideMenu';
import HiringExplorer from './hiring/HiringExplorer';
import StandardExplorer from './keyboard/StandardExplorer';
import getWindowDimensions from '../../utils/WindowDimensions';
import ProjectsExplorer from './projects/ProjectsExplorer';
import EnddayExplorer from './endday/EnddayExplorer';
import SettingsExplorer from './settings/SettingsExplorer';
import InfoExplorer from './info/InfoExplorer';
import { Project } from '../../assets/projectsData';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import { decrementTimeRemainingByAmount, incrementLinesByAmount, ProjectNoIcon, resetProject, startProject } from '../../utils/redux/slices/projectsSlice';
import { decrementMoneyByAmount, incrementMoneyByAmount } from '../../utils/redux/slices/moneySlice';
import { codeContent } from '../../assets/codeContent';
import { ableToPurchase, FloatingPoint, multiply } from '../../utils/MoneyManager';
import { upgradesData } from '../../assets/upgradesData';

export enum ExplorerStates {
    HIRING,
    STANDARD,
    PROJECTS,
    ENDDAY,
    INFO,
    SETTINGS
}

interface ExplorerProps {
    setOverlay: Function
}

function Explorer(props: ExplorerProps) {
    const [explorerState, setExplorerState] = useState<ExplorerStates>(ExplorerStates.HIRING)
    const [alerts, setAlerts] = useState<Object>({ [ExplorerStates.STANDARD]: false, [ExplorerStates.PROJECTS]: false })
    const codingAreaState = useAppSelector(state => state.codingArea)
    const [prevIndex, setPrevIndex] = useState<number>(0)
    const projectState = useAppSelector(state => state.projects)
    const lifetimeMoney: FloatingPoint = useAppSelector(state => state.money.lifetime)
    const isStandardUpgradePurchased = useAppSelector(state => state.upgrades.isStandardUpgradePurchased)
    const dispatch = useAppDispatch()

    // Handle effects when coding area is updated
    useEffect(() => {
        if (projectState.currentProject != null) {
            if (projectState.linesCompleted < projectState.currentProject.requiredLines) {
                const linesIncrement = calculateLineIncrease(codingAreaState.currentIndex, prevIndex)
                dispatch(incrementLinesByAmount(linesIncrement))
            } else {
                if (explorerState != ExplorerStates.PROJECTS) {
                    setAlerts({ ...alerts, [ExplorerStates.PROJECTS]: true })
                }
                dispatch(incrementMoneyByAmount(projectState.currentProject.payout))
                dispatch(resetProject())
            }
        }
        setPrevIndex(codingAreaState.currentIndex)
    }, [codingAreaState.currentIndex])

    // Handle how time passes for projects
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

    // Handle increase in lifetime money. Used to determine if alert for Standard Explorer should be displayed.
    useEffect(() => {
        upgradesData.standard.map((upgrade, index) => {
            if (!isStandardUpgradePurchased[index] && ableToPurchase(multiply(lifetimeMoney, 5), upgrade.baseCost)) {
                setAlerts({ ...alerts, [ExplorerStates.STANDARD]: true })
            }
        })
    }, [lifetimeMoney])

    const handleExplorerStateChange = (value: ExplorerStates) => {
        setAlerts({ ...alerts, [value]: false })
        setExplorerState(value)
    }

    return (
        <>
            <SideMenu
                explorerState={explorerState}
                setExplorerState={(value: ExplorerStates) => handleExplorerStateChange(value)}
                alerts={alerts} />
            <div style={{ ...styles.container, height: getWindowDimensions().height - TITLE_BAR_HEIGHT }}>
                <div style={{ ...styles.scrollBarHide, height: getWindowDimensions().height - TITLE_BAR_HEIGHT }} />
                {
                    explorerState == ExplorerStates.HIRING &&
                    <HiringExplorer />
                }
                {
                    explorerState == ExplorerStates.STANDARD &&
                    <StandardExplorer />
                }
                {
                    explorerState == ExplorerStates.PROJECTS &&
                    <ProjectsExplorer handleStartProject={(project: Project) => handleStartProject(project)} />
                }
                {
                    explorerState == ExplorerStates.ENDDAY &&
                    <EnddayExplorer />
                }
                {
                    explorerState == ExplorerStates.INFO &&
                    <InfoExplorer
                        setOverlay={(modal: JSX.Element) => props.setOverlay(modal)} />
                }
                {
                    explorerState == ExplorerStates.SETTINGS &&
                    <SettingsExplorer />
                }
            </div>
        </>
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
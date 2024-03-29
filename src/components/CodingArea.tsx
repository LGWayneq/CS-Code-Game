import { useState, useEffect, useRef } from 'react';
import { colours } from '../assets/colours';
import { startComment } from '../assets/codeContent';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH, TITLE_BAR_HEIGHT, CODE_LINE_HEIGHT, TAB_HEIGHT } from '../assets/constants';
import CodeLine from './CodeLine';
import { incrementMoneyByAmount } from '../utils/redux/slices/moneySlice'
import { setCurrentIndex, setCurrentLine, setResidualChars, resetCodingArea } from '../utils/redux/slices/codingAreaSlice';
import { useAppDispatch } from '../utils/redux/hooks';
import { useAppSelector } from '../utils/redux/hooks'
import { playTypingSound } from '../utils/sounds/TypingSounds';
import { calculateTimeElapsed, calculateTimeElapsedMillisecond } from '../utils/DateTime';
import { calculateNewCodeLines } from '../utils/CodingAreaHelper';
import { setLastFocused } from '../utils/redux/slices/sessionSlice';

const TICK_DURATION = 20
const initialCodeLines = startComment + '\n'

function CodingArea() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [codeLines, setCodeLines] = useState<string>(initialCodeLines)
    const [keypressed, setKeypressed] = useState<boolean>(false)
    const [prevKeydownTime, setPrevKeydownTime] = useState<Date>(new Date())
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const [blurred, setBlurred] = useState<boolean>(true)
    const [prevTick, setPrevTick] = useState<Date>(new Date())
    const lastFocused = useAppSelector(state => state.session.lastFocused)
    const codingAreaState = useAppSelector(state => state.codingArea)
    const cpk = useAppSelector(state => state.cpk.value)
    const cps = useAppSelector(state => state.cps.value)
    const mpl = useAppSelector(state => state.mpl.value)
    const volume = useAppSelector(state => state.settings.volume)
    const dayStart = useAppSelector(state => state.dayStart.value)
    const dispatch = useAppDispatch()

    //useEffect to emulate game running in background when tabbed/closed.
    useEffect(() => {
        window.addEventListener("load", onLoad);
        window.addEventListener('beforeunload', onUnload);
        onLoad();
        return () => {
            window.removeEventListener("load", onLoad);
            window.removeEventListener("beforeunload", onUnload);
        };
    }, [blurred, lastFocused]);

    //calculate timeElapsed since blurred/closed, and update game state accordingly.
    const onLoad = () => {
        const timeElapsed = calculateTimeElapsed(new Date(lastFocused))
        if (timeElapsed > 1) {
            const charIncrement = timeElapsed * cps
            const numOfLinesAdded = updateCodeLines(codingAreaState.currentIndex, charIncrement)
            updateMoney(numOfLinesAdded)
        }
        setBlurred(false)
    };

    const onUnload = () => {
        const now = new Date()
        dispatch(setLastFocused(now.toString()))
        setBlurred(true)
    };

    //first render: render codelines based on currentIndex
    useEffect(() => {
        updateCodeLines(1, codingAreaState.currentIndex - 1)
        setIsFirstLoad(false)
    }, [])

    //useEffect to handle active typing
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [codeLines, codingAreaState.currentIndex, keypressed])

    //useEffect to handle idle typing
    useEffect(() => {
        const idleUpdater = setInterval(() => handleTick(), TICK_DURATION)
        return () => clearInterval(idleUpdater)
    }, [codeLines, codingAreaState.currentIndex, codingAreaState.residualChars, prevTick, cps])

    useEffect(() => {
        if (!isFirstLoad) {
            dispatch(resetCodingArea())
            setCodeLines(initialCodeLines)
        }
    }, [dayStart])

    function handleKeyDown() {
        const timeElapsed: number = calculateTimeElapsed(prevKeydownTime) * 1000
        if (!keypressed && timeElapsed > TICK_DURATION) {
            const cpsIncrement = getCpsIncrement(1)
            const numOfLinesAdded = updateCodeLines(codingAreaState.currentIndex, cpk + cpsIncrement)
            updateMoney(numOfLinesAdded)
            playTypingSound(volume / 100)
        }
        setKeypressed(true)
        setPrevKeydownTime(new Date())
    }

    function handleKeyUp() {
        setKeypressed(false)
    }

    const handleTick = () => {
        if (cps > 0) {
            const actualTickDuration = calculateTimeElapsedMillisecond(prevTick)
            setPrevTick(new Date())

            const multiplier = actualTickDuration / TICK_DURATION
            const cpsIncrement: number = getCpsIncrement(multiplier)
            //use integer CPS to update codeLines
            const numOfLinesAdded = updateCodeLines(codingAreaState.currentIndex, cpsIncrement)
            updateMoney(numOfLinesAdded)
        }
    }

    const getCpsIncrement = (multipler: number): number => {
        //handle float CPS values
        const cpsIncrementFloat = codingAreaState.residualChars + multipler * cps / (1000 / TICK_DURATION)
        const cpsIncrementInt = Math.trunc(cpsIncrementFloat)
        dispatch(setResidualChars(cpsIncrementFloat - cpsIncrementInt))
        return cpsIncrementInt
    }

    const updateCodeLines = (currentIndex: number, increment: number) => {
        const { newCodeLines, newIndex, numOfLinesAdded } = calculateNewCodeLines(codeLines, currentIndex, increment)
        setCodeLines(newCodeLines)
        trimCodeLines(newCodeLines)
        dispatch(setCurrentIndex(newIndex))
        return numOfLinesAdded
    }

    const trimCodeLines = (codeLines: string) => {
        const codingAreaHeight = containerRef.current?.clientHeight == undefined ? 0 : containerRef.current?.clientHeight
        const codeLinesArray = codeLines.split('\n')

        const maxNumOfCodeLines: number = Math.round(0.9 * codingAreaHeight / CODE_LINE_HEIGHT)
        const numOfRemovableLines = codeLinesArray.length - maxNumOfCodeLines
        if (numOfRemovableLines > 0) {
            dispatch(setCurrentLine(codingAreaState.currentLine + numOfRemovableLines))
            const newCodeLinesArray = codeLinesArray.slice(numOfRemovableLines)
            const newCodeLines = newCodeLinesArray.join('\n')
            setCodeLines(newCodeLines)
        }
    }

    const updateMoney = (numOfLinesAdded: number) => {
        dispatch(incrementMoneyByAmount({ base: mpl * numOfLinesAdded, exponent: 0 }))
    }

    return (
        <div
            ref={containerRef}
            style={{
                ...styles.container,
                height: 0.7 * WindowDimensions().height - TITLE_BAR_HEIGHT - TAB_HEIGHT,
                width: WindowDimensions().width - SIDE_MENU_WIDTH - EXPLORER_WIDTH,
            }}>
            {codeLines.split('\n').map((line, index) => {
                return (
                    //index probably need to be changed
                    <CodeLine key={index} index={codingAreaState.currentLine + index} highlighted={index == codeLines.split('\n').length - 1}>{line}</CodeLine>
                )
            })}
        </div>
    );
}

export default CodingArea;

const styles = {
    container: {
        backgroundColor: colours.main,
        justifyContent: 'center',
    },
}
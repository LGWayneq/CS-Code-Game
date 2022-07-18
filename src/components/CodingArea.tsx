import React, { useState, useEffect, useRef } from 'react';
import { colours } from '../assets/colours';
import { codeContent, startComment } from '../assets/codeContent';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH, TITLE_BAR_HEIGHT, CODE_LINE_HEIGHT, TAB_HEIGHT } from '../assets/constants';
import CodeLine from './CodeLine';
import { incrementMoneyByAmount } from '../utils/redux/slices/moneySlice'
import { setCurrentIndex, setCurrentLine, setResidualChars, resetCodingArea } from '../utils/redux/slices/codingAreaSlice';
import { useAppDispatch } from '../utils/redux/hooks';
import { useAppSelector } from '../utils/redux/hooks'
import { playTypingSound } from '../utils/sounds/TypingSounds';

const initialCodeLines = startComment + '\n'

function CodingArea() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [codeLines, setCodeLines] = useState<string>(initialCodeLines)
    const [keypressed, setKeypressed] = useState<boolean>(false)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const codingAreaState = useAppSelector(state => state.codingArea)
    const cpk = useAppSelector(state => state.cpk.value)   // cpk - characters per press
    const cps = useAppSelector(state => state.cps.value)
    const mpl = useAppSelector(state => state.mpl.value)
    const volume = useAppSelector(state => state.settings.volume)
    const dayStart = useAppSelector(state => state.dayStart.value)
    const dispatch = useAppDispatch()

    //first render: render codelines based on currentIndex
    useEffect(() => {
        updateCodeLines(1, codingAreaState.currentIndex - 1)
        setIsFirstLoad(false)
    }, [])

    //useEffect to handle active typing
    useEffect(() => {
        function handleKeyDown() {
            if (!keypressed) {
                const numOfLinesAdded = updateCodeLines(codingAreaState.currentIndex, cpk)
                updateMoney(numOfLinesAdded)
                playTypingSound(volume/100)
            }
            setKeypressed(true)
        }
        function handleKeyUp() {
            setKeypressed(false)
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [codeLines, codingAreaState.currentIndex, keypressed])

    //useEffect to handle idle typing
    useEffect(() => {
        const idleUpdater = setInterval(() => {
            //handle float CPS values
            if (cps > 0) {
                const cpsIncrementFloat = codingAreaState.residualChars + cps / 10
                const cpsIncrementInt = Math.trunc(cpsIncrementFloat)
                dispatch(setResidualChars(cpsIncrementFloat - cpsIncrementInt))
                //use integer CPS to update codeLines
                const numOfLinesAdded = updateCodeLines(codingAreaState.currentIndex, cpsIncrementInt)
                updateMoney(numOfLinesAdded)
            }
        }, 100)
        return () => clearInterval(idleUpdater)
    })

    useEffect(() => {
        if (!isFirstLoad) {
            dispatch(resetCodingArea())
            setCodeLines(initialCodeLines)
        }
    }, [dayStart])

    const updateCodeLines = (currentIndex: number, increment: number) => {
        var newIndex = currentIndex + increment
        var newCodeLines = codeLines
        newCodeLines += codeContent.slice(currentIndex, newIndex)
        var numOfLinesAdded = (codeContent.slice(currentIndex, newIndex).match(/\n/g) || []).length
        if (newIndex > codeContent.length) {
            while (newIndex >= codeContent.length) {
                newIndex -= codeContent.length
                newCodeLines += codeContent.slice(0, newIndex)
                numOfLinesAdded += (codeContent.slice(0, newIndex).match(/\n/g) || []).length
            }
        }
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
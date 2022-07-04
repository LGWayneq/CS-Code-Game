import React, { useState, useEffect, useRef } from 'react';
import { colours } from '../assets/colours';
import { codeContent, startComment } from '../assets/codeContent';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH, TITLE_BAR_HEIGHT, CODE_LINE_HEIGHT } from '../assets/constants';
import CodeLine from './CodeLine';
import { incrementByAmount, decrementByAmount } from '../utils/redux/slices/moneySlice'
import { useAppDispatch } from '../utils/redux/hooks';
import { useAppSelector } from '../utils/redux/hooks'

const initialCodeLines = [
    <CodeLine key={-1} index={-1} highlighted={false}>{startComment}</CodeLine>,
    <CodeLine key={0} index={0} highlighted={true}>{""}</CodeLine>
]

function CodingArea() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [codeLines, setCodeLines] = useState<Array<JSX.Element>>(initialCodeLines)
    const [currentIndex, setCurrentIndex] = useState<number>(1)
    const [currentLine, setCurrentLine] = useState<number>(0)
    const [keypressed, setKeypressed] = useState<boolean>(false)
    const cpk = useAppSelector(state => state.cpk.value)   // cpk - characters per press
    const cpms = useAppSelector(state => state.cpms.value)
    const mpl = useAppSelector(state => state.mpl.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        function handleKeyDown() {
            if (!keypressed) {
                updateCodeLines(currentIndex, cpk)
                trimCodeLines()
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
    }, [currentIndex, keypressed])

    useEffect(() => {
        //todo: add handling of cpms and cpk float values
        const idleUpdater = setInterval(() => {
            updateCodeLines(currentIndex, cpms)
            trimCodeLines()
        }, 100)
        return () => clearInterval(idleUpdater)
    })

    const updateCodeLines = (currentIndex: number, increment: number) => {
        var _currentLine: number = currentLine
        var currentCodeLine: JSX.Element | undefined
        for (var i = 0; i < increment; i++) {
            //check if reached end of codeContent. loop back to first index
            if (currentIndex + i >= codeContent.length) {
                currentIndex = -i + 1
            }
            //pop codeLines to modify content in current line
            if (i == 0 || codeContent[currentIndex + i - 1] == '\n') {
                currentCodeLine = codeLines.pop()
            }
            //behaviour to create new line
            if (codeContent[currentIndex + i] == '\n') {
                appendCodeLine(<CodeLine key={_currentLine} index={_currentLine} highlighted={false}>{currentCodeLine?.props.children}</CodeLine>)
                _currentLine++
                currentCodeLine = <CodeLine key={_currentLine} index={_currentLine} highlighted={true}>{""}</CodeLine>
                appendCodeLine(currentCodeLine)
                setCurrentLine(_currentLine)
                dispatch(incrementByAmount(mpl))
            } else {    //default behaviour
                currentCodeLine = <CodeLine key={_currentLine} index={_currentLine} highlighted={true}>{currentCodeLine?.props.children + codeContent[currentIndex + i]}</CodeLine>
            }
        }

        if (codeContent[currentIndex + i - 1] != '\n') {
            appendCodeLine(currentCodeLine)
        }
        setCurrentIndex(currentIndex + increment)
    }

    const appendCodeLine = (newCodeLine: JSX.Element | undefined) => {
        if (newCodeLine != undefined) {
            const currentCodeLines = codeLines
            currentCodeLines.push(newCodeLine)
            setCodeLines(currentCodeLines)
            return currentCodeLines
        } else {
            return codeLines
        }
    }

    const trimCodeLines = () => {
        const codingAreaHeight = containerRef.current?.clientHeight == undefined ? 0 : containerRef.current?.clientHeight
        var numOfRemovableLines = 0
        while ((codeLines.length - numOfRemovableLines) * CODE_LINE_HEIGHT > 0.9 * codingAreaHeight) {
            numOfRemovableLines++
        }
        setCodeLines(codeLines.slice(numOfRemovableLines))
    }

    return (
        <div
            ref={containerRef}
            style={{
                ...styles.container,
                height: 0.7 * WindowDimensions().height - TITLE_BAR_HEIGHT,
                width: WindowDimensions().width - SIDE_MENU_WIDTH - EXPLORER_WIDTH,
            }}>
            {codeLines}
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
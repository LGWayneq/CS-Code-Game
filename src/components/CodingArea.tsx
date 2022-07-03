import React, { useState, useEffect, useRef } from 'react';
import { colours } from '../assets/colours';
import { codeContent } from '../assets/codeContent';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH, TITLE_BAR_HEIGHT, CODE_LINE_HEIGHT } from '../assets/constants';
import CodeLine from './CodeLine';


function CodingArea() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [codeLines, setCodeLines] = useState<Array<JSX.Element>>([<CodeLine key={0} index={0} highlighted={true}>{""}</CodeLine>])
    const [currentIndex, setCurrentIndex] = useState<number>(1)
    const [currentLine, setCurrentLine] = useState<number>(0)
    const [cpk, setCpk] = useState<number>(50)   // cpk - characters per press

    useEffect(() => {
        function handleKeyPress(this: Window, event: KeyboardEvent) {
            updateCodeLines(currentIndex, cpk)
            trimCodeLines()
        }
        window.addEventListener('keypress', handleKeyPress)
        return () => window.removeEventListener('keypress', handleKeyPress)
    }, [currentIndex])

    const updateCodeLines = (currentIndex: number, cpk: number) => {
        var _currentLine: number = currentLine
        var currentCodeLine: JSX.Element | undefined
        for (var i = 0; i < cpk; i++) {
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
            } else {    //default behaviour
                currentCodeLine = <CodeLine key={_currentLine} index={_currentLine} highlighted={true}>{currentCodeLine?.props.children + codeContent[currentIndex + i]}</CodeLine>
            }
        }

        if (codeContent[currentIndex + i - 1] != '\n') {
            appendCodeLine(currentCodeLine)
        }
        setCurrentIndex(currentIndex + cpk)
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
            console.log((codeLines.length - numOfRemovableLines) * CODE_LINE_HEIGHT)
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
        // overflowY: 'scroll' as 'scroll'
    },
}
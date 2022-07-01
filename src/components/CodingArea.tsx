import React, { useState, useEffect } from 'react';
import { colours } from '../assets/colours';
import { codeContent } from '../assets/codeContent';
import CodeLine from './CodeLine';

interface PointerPosition {
    lineIndex: number,
    charIndex: number
}

function CodingArea() {
    const fullCodeContent = codeContent
    const [codeLines, setCodeLines] = useState<Array<JSX.Element>>([<CodeLine key={0} index={0} highlighted={true}>{""}</CodeLine>])
    const [pointerPosition, setPointerPosition] = useState<PointerPosition>({ lineIndex: 0, charIndex: 0 })
    const [cpk, setCpk] = useState<number>(1)   // cpk - characters per press

    useEffect(() => {
        function handleKeyPress(this: Window, event: KeyboardEvent) {
            var prevPointer = pointerPosition
            var newPointer = updatePointerPosition()
            updateCodeLines(newPointer, prevPointer)
        }
        window.addEventListener('keypress', handleKeyPress)
        return () => window.removeEventListener('keypress', handleKeyPress)
    }, [pointerPosition])

    const updatePointerPosition = () => {
        var newLineIndex = pointerPosition.lineIndex
        var newCharIndex = pointerPosition.charIndex
        var remaindingCpk = cpk
        while (remaindingCpk > 0) {
            if (fullCodeContent[newLineIndex].length - newCharIndex > remaindingCpk) {
                newCharIndex += remaindingCpk
                remaindingCpk = 0
            } else if (fullCodeContent[newLineIndex].length - newCharIndex == remaindingCpk) {
                newCharIndex = 0
                newLineIndex++
                remaindingCpk = 0
            } else {
                remaindingCpk -= (fullCodeContent[newLineIndex].length - newCharIndex)
                newCharIndex = 0
                newLineIndex++
            }
        }
        const newPointer = { lineIndex: newLineIndex, charIndex: newCharIndex }
        setPointerPosition(newPointer)
        return newPointer
    }

    //todo: implement loopback at end of codeContent
    const updateCodeLines = (newPointer: PointerPosition, prevPointer: PointerPosition) => {
        var newCodeLines = codeLines
        if (fullCodeContent[prevPointer.lineIndex].length > prevPointer.charIndex) {
            newCodeLines.pop()
        }
        for (var i = prevPointer.lineIndex; i < newPointer.lineIndex; i++) {
            newCodeLines.push(
                <CodeLine key={i} index={i} highlighted={false}>
                    {fullCodeContent[i]}
                </CodeLine>
            )
        }
        newCodeLines.push(
            <CodeLine key={newPointer.lineIndex} index={newPointer.lineIndex} highlighted={true}>
                {fullCodeContent[newPointer.lineIndex].slice(0, newPointer.charIndex)}
            </CodeLine>
        )
        setCodeLines(newCodeLines)
    }

    return (
        <div style={styles.container}>
            {codeLines}
        </div>
    );
}

export default CodingArea;

const styles = {
    container: {
        flexGrow: 1,
        backgroundColor: colours.main,
        justifyContent: 'center',
    }
}
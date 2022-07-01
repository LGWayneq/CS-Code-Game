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
            while (newPointer.lineIndex > fullCodeContent.length - 1) {
                const updatedPointers = resetPointerPosition(prevPointer, newPointer)
                prevPointer = updatedPointers.prevPointer
                newPointer = updatedPointers.newPointer
            }
            updateCodeLines(prevPointer, newPointer)
        }
        window.addEventListener('keypress', handleKeyPress)
        return () => window.removeEventListener('keypress', handleKeyPress)
    }, [pointerPosition])

    const updatePointerPosition = () => {
        var newLineIndex = pointerPosition.lineIndex
        var newCharIndex = pointerPosition.charIndex
        var remainingCpk = cpk
        while (remainingCpk > 0) {
            if (fullCodeContent[newLineIndex].length - newCharIndex > remainingCpk) {
                newCharIndex += remainingCpk
                remainingCpk = 0
            } else if (fullCodeContent[newLineIndex].length - newCharIndex == remainingCpk) {
                newCharIndex = 0
                newLineIndex++
                remainingCpk = 0
            } else {
                remainingCpk -= (fullCodeContent[newLineIndex].length - newCharIndex)
                newCharIndex = 0
                newLineIndex++
            }
        }
        const newPointer = { lineIndex: newLineIndex, charIndex: newCharIndex }
        setPointerPosition(newPointer)
        return newPointer
    }

    const updateCodeLines = (prevPointer: PointerPosition, newPointer: PointerPosition) => {
        const newCodeLines = codeLines
        if (fullCodeContent[prevPointer.lineIndex].length > prevPointer.charIndex) {
            newCodeLines.pop()
        }
        if (newCodeLines.length > 0) console.log(newCodeLines[newCodeLines.length - 1].props.children)
        for (var i = prevPointer.lineIndex; i < newPointer.lineIndex; i++) {
            newCodeLines.push(
                <CodeLine key={i} index={i} highlighted={false}>
                    {fullCodeContent[i]}
                </CodeLine>
            )
        }
        
        if (newPointer.charIndex == fullCodeContent[newPointer.lineIndex].length) {
            newCodeLines.push(
                <CodeLine key={newPointer.lineIndex} index={newPointer.lineIndex} highlighted={false}>
                    {fullCodeContent[newPointer.lineIndex].slice(0, newPointer.charIndex)}
                </CodeLine>
            )
            newCodeLines.push(
                <CodeLine key={newPointer.lineIndex + 1} index={newPointer.lineIndex + 1} highlighted={true}>
                    {""}
                </CodeLine>
            )
        } else {
            newCodeLines.push(
                <CodeLine key={newPointer.lineIndex} index={newPointer.lineIndex} highlighted={true}>
                    {fullCodeContent[newPointer.lineIndex].slice(0, newPointer.charIndex)}
                </CodeLine>
            )
        }

        setCodeLines(newCodeLines)
    }

    const resetPointerPosition = (prevPointer: PointerPosition, newPointer: PointerPosition) => {
        updateCodeLines(
            prevPointer,
            { lineIndex: fullCodeContent.length - 1, charIndex: fullCodeContent[fullCodeContent.length - 1].length }
        )
        newPointer = { lineIndex: newPointer.lineIndex - prevPointer.lineIndex - 1, charIndex: newPointer.charIndex }
        prevPointer = { lineIndex: 0, charIndex: 0 }
        setPointerPosition(newPointer)
        return { prevPointer: prevPointer, newPointer: newPointer }
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
import { codeContent } from "../assets/codeContent"

const calculateNewCodeLines = (codeLines: string, currentIndex: number, increment: number) => {
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

    return { newCodeLines, newIndex, numOfLinesAdded }
}

export { calculateNewCodeLines }
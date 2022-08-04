import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { CODE_LINE_HEIGHT } from '../assets/constants';
import TextCursor from './TextCursor';

interface CodeLineProps {
    index: number,
    children: string,
    highlighted: boolean
}

const styles = {
    container: {
        height: CODE_LINE_HEIGHT,
        backgroundColor: colours.main,
        display: 'flex',
        flexDirection: 'row' as 'row',
    },
    divider: {
        height: CODE_LINE_HEIGHT,
        width: 1,
        backgroundColor: colours.divider,
    }
}

const SPACING_ELEMENT = <body style={{ ...textStyles.codeContent }}>&nbsp;</body>
const DIVIDER_ELEMENT = <div style={styles.divider} />

function CodeLine(props: CodeLineProps) {

    function renderTabs() {
        const tabs: Array<JSX.Element> = []
        var pointer = 0
        while (props.children[pointer] == " ") {
            if (pointer % 4 == 0) {
                tabs.push(DIVIDER_ELEMENT)
            }
            tabs.push(SPACING_ELEMENT)
            tabs.push(SPACING_ELEMENT)
            pointer++
        }
        return tabs
    }

    function renderContent() {
        if (props.children.length == 0) {
            return DIVIDER_ELEMENT
        } else if (props.children.includes('#')) {
            return <body style={textStyles.comment}>{`${props.children}`}</body>
        } else {
            const content: Array<JSX.Element> = []
            var pointer = 0
            // todo: while loop to get past the tabs. replace with renderTabs function call
            while (props.children[pointer] == " ") {
                pointer++
            }
            var children: string = insertEscapeChar(props.children)
            if (children.slice(pointer).match(/.*(if|else|return|while|for).*/)) {
                const spaceIndex = children.slice(pointer).indexOf(" ")  != -1 ? children.slice(pointer).indexOf(" ") : children.slice(pointer).length
                content.push(<body style={textStyles.codeKeyword}>{`${children.slice(pointer, pointer + spaceIndex)}`}</body>)
                pointer += spaceIndex
            } else if (children.slice(pointer, pointer + 3).match(/^def$/)) {
                content.push(<body style={textStyles.codeDef}>{`${children.slice(pointer, pointer + 3)}`}</body>)
                pointer += 3
            }
            while (pointer < children.length) {
                if (children[pointer] == " ") {
                    content.push(SPACING_ELEMENT)
                } else if (children[pointer].match(/[:=<>+\-*\/,]/)) {
                    content.push(<body style={textStyles.codeWhite}>{`${children[pointer]}`}</body>)
                } else if (children[pointer] == "\\") {
                    const bracketIndex = children.slice(pointer).indexOf('(')
                    content.push(<body style={textStyles.codeFunction}>{`${children.slice(pointer + 1, pointer + bracketIndex)}`}</body>)
                    pointer += bracketIndex - 1
                } else if (children[pointer].match(/[\[\]()]/)) {
                    content.push(<body style={textStyles.codeBracket}>{`${children[pointer]}`}</body>)
                } else if ((children.slice(pointer, pointer + 3).match(/^and$/) ||
                    children.slice(pointer, pointer + 2).match(/^or$/) ||
                    children.slice(pointer, pointer + 4).match(/^True$|^None$/) ||
                    children.slice(pointer, pointer + 5).match(/^False$/)) && children[pointer - 1] == " ") {
                    var spaceIndex = children.slice(pointer).indexOf(" ")
                    if (spaceIndex == -1) spaceIndex = pointer + 1
                    content.push(<body style={textStyles.codeDef}>{`${children.slice(pointer, pointer + spaceIndex)}`}</body>)
                    pointer += spaceIndex - 1
                } else if (!isNaN(Number(children[pointer]))) {
                    var endOfNumber = pointer
                    while (!isNaN(Number(children.slice(pointer, endOfNumber))) && endOfNumber <= children.length) {
                        endOfNumber++
                    }
                    endOfNumber--
                    content.push(<body style={textStyles.codeNumber}>{`${children.slice(pointer, endOfNumber)}`}</body>)
                    if (children[pointer] == " ") pointer = endOfNumber - 1    //????
                } else if (children[pointer] === '"') {
                    var endOfString = children.slice(pointer + 1).indexOf('"')
                    if (endOfString === -1) endOfString = children.slice(pointer).length
                    content.push(<body style={textStyles.codeString}>{`${children.slice(pointer, pointer + endOfString + 2)}`}</body>)
                    pointer += endOfString + 1
                } else if (children.slice(pointer, pointer + 2).match(/^in$/) && children[pointer - 1] == " ") {
                    var spaceIndex = children.slice(pointer).indexOf(" ")
                    if (spaceIndex == -1) spaceIndex = pointer + 1
                    content.push(<body style={textStyles.codeKeyword}>{`${children.slice(pointer, pointer + spaceIndex)}`}</body>)
                    pointer += spaceIndex - 1
                } else {
                    content.push(<body style={textStyles.codeContent}>{`${children[pointer]}`}</body>)
                }
                pointer++
            }
            return content
        }
    }

    function insertEscapeChar(children: string): string {
        var newChild = ""
        var iterString = children
        while (iterString.indexOf('(') != -1) {
            var bracketIndex = iterString.indexOf('(')
            var i = bracketIndex
            while (iterString[i] != " ") i--
            newChild += (iterString.slice(0, i + 1) + '\\' + iterString.slice(i + 1, bracketIndex + 1))
            iterString = iterString.slice(bracketIndex + 1)
        }
        newChild += iterString
        return newChild
    }

    return (
        <div style={styles.container}>
            <body style={props.highlighted ? textStyles.codeLabelHighlighted : textStyles.codeLabel}>{props.index + 1}</body>
            {renderTabs()}
            {renderContent()}
            {props.highlighted && <TextCursor />}
        </div>
    );
}

export default CodeLine;
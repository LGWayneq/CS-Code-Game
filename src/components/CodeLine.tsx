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
        marginTop: CODE_LINE_HEIGHT - 4,
    }
}

const SPACING_ELEMENT = <p style={{ ...textStyles.codeContent }}>&nbsp;</p>
const DIVIDER_ELEMENT = <div style={styles.divider} />

// todo: implement text evaluation to colour text
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
        } else if (props.children[0] == '#') {
            return <p style={textStyles.comment}>{`${props.children}`}</p>
        } else {
            const content: Array<JSX.Element> = []
            var pointer = 0
            // todo: while loop to get past the tabs. replace with renderTabs function call
            while (props.children[pointer] == " ") {
                pointer++
            }
            var children = insertEscapeChar(props.children)
            console.log(children)
            while (pointer < children.length) {
                if (children[pointer] == " ") {
                    content.push(SPACING_ELEMENT)
                } else if (children[pointer].match(/[:=<>+\-*\/,]/)) {
                    content.push(<p style={textStyles.codeWhite}>{`${children[pointer]}`}</p>)
                } else if (children[pointer] == "\\") {
                    const bracketIndex = children.slice(pointer).indexOf('(')
                    content.push(<p style={textStyles.codeFunction}>{`${children.slice(pointer + 1, pointer + bracketIndex)}`}</p>)
                    pointer += bracketIndex - 1
                } else if (children[pointer].match(/[\[\]()]/)) {
                    content.push(<p style={textStyles.codeBracket}>{`${children[pointer]}`}</p>)
                } else if (children.slice(pointer, pointer + 3).match(/^def$|^and$|^or$/)) {
                    content.push(<p style={textStyles.codeDef}>{`${children.slice(pointer, pointer + 3)}`}</p>)
                    pointer += 2
                } else if (children[pointer] === '"') {
                    var endOfString = children.slice(pointer + 1).indexOf('"')
                    if (endOfString === -1) endOfString = children.slice(pointer).length
                    content.push(<p style={textStyles.codeString}>{`${children.slice(pointer, pointer + endOfString + 2)}`}</p>)
                    pointer += endOfString + 1
                } else if (children.match(/^if$|^else$|^while$|^return$/)) {
                    //doesnt work yet
                    content.push(<p style={textStyles.codeKeyword}>{`${children.slice(pointer, pointer + 3)}`}</p>)
                } else {
                    content.push(<p style={textStyles.codeContent}>{`${children[pointer]}`}</p>)
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
            <p style={props.highlighted ? textStyles.codeLabelHighlighted : textStyles.codeLabel}>{props.index + 1}</p>
            {renderTabs()}
            {renderContent()}
            {props.highlighted && <TextCursor />}
        </div>
    );
}

export default CodeLine;
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
            while (pointer < props.children.length) {
                if (props.children[pointer] == " ") {
                    content.push(SPACING_ELEMENT)
                } else if (props.children[pointer].match(/[:=<>+\-*\/,]/)) {
                    content.push(<p style={textStyles.codeWhite}>{`${props.children[pointer]}`}</p>)
                } else if (props.children[pointer].match(/[\[\]()]/)) {
                    content.push(<p style={textStyles.codeBracket}>{`${props.children[pointer]}`}</p>)
                } else if (props.children.slice(pointer, pointer + 3) == "def") {
                    content.push(<p style={textStyles.codeDef}>{`${props.children.slice(pointer, pointer + 3)}`}</p>)
                    pointer += 3
                    const endOfFunctionName = props.children.slice(pointer).indexOf('(')
                    content.push(SPACING_ELEMENT)
                    content.push(<p style={textStyles.codeFunction}>{`${props.children.slice(pointer, pointer + endOfFunctionName)}`}</p>)
                    pointer += endOfFunctionName - 1
                } else if (props.children.match(/^if$|^else$|^while$|^return$/)) {
                    content.push(<p style={textStyles.codeKeyword}>{`${props.children.slice(pointer, pointer + 3)}`}</p>)
                } else {
                    content.push(<p style={textStyles.codeContent}>{`${props.children[pointer]}`}</p>)
                }
                pointer++
            }
            return content
        }
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
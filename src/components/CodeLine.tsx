import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { CODE_LINE_HEIGHT } from '../assets/constants';
import TextCursor from './TextCursor';

interface CodeLineProps {
    index: number,
    children: string,
    highlighted: boolean
}

// todo: implement text evaluation to colour text
function CodeLine(props: CodeLineProps) {

    function renderTabs() {
        var tabs = []
        var pointer = 0
        while (props.children[pointer] == " ") {
            if (pointer % 4 == 0) {
                tabs.push(<div style={styles.divider}/>)
            }
            tabs.push(<p style={{ color: colours.main }}>..</p>)
            pointer++
        }
        console.log(tabs)
        return tabs
    }

    return (
        <div style={styles.container}>
            <p style={props.highlighted ? textStyles.codeLabelHighlighted : textStyles.codeLabel}>{props.index + 1}</p>
            {renderTabs()}
            <p style={textStyles.codeContent}>{`${props.children}`}</p>
            {props.highlighted && <TextCursor />}
        </div>
    );
}

export default CodeLine;

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
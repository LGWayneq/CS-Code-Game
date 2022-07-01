import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';

interface CodeLineProps {
    index: number,
    children: string,
    highlighted: boolean
}

// todo: implement text evaluation to colour text
function CodeLine(props: CodeLineProps) {
    return (
        <div style={styles.container}>
            <p style={props.highlighted ? textStyles.codeLabelHighlighted : textStyles.codeLabel}>{props.index}</p>
            <p style={textStyles.codeContent}>{props.children}</p>
        </div>
    );
}

export default CodeLine;

const styles = {
    container: {
        height: 20,
        backgroundColor: colours.main,
        display: 'flex',
        flexDirection: 'row' as 'row',
    },

}
import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH } from '../assets/constants';
import { useAppSelector } from '../utils/redux/hooks'

function Terminal() {
    const money = useAppSelector(state => state.money.value)
    const cpms = useAppSelector(state => state.cpms.value)

    return (
        <div style={{
            ...styles.container,
            height: 0.3 * WindowDimensions().height - 41,
            width: WindowDimensions().width - SIDE_MENU_WIDTH - EXPLORER_WIDTH - 40
        }}>
            <div style={styles.labelContainer}>
                <body style={{ ...textStyles.terminalLabel, fontSize: 12, marginBottom: 10 }}>TERMINAL</body>
            </div>
            <body style={{ ...textStyles.terminalLabel, fontSize: 14, marginTop: 10 }}>Money: ${money}</body>
            <body style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Idle Typing Speed: {cpms} characters per millisecond</body>
        </div>
    );
}

export default Terminal;

const styles = {
    container: {
        backgroundColor: colours.main,
        borderTop: `1px solid ${colours.divider}`,
        padding: 20,
    },
    labelContainer: {
        display: 'table',
        borderBottom: `1px solid rgba(204,204,204,1)`,
    }
}
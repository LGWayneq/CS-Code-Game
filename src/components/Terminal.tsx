import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH } from '../assets/constants';
import { useAppSelector } from '../utils/redux/hooks'

function Terminal() {
    const money = useAppSelector(state => state.money.value)

    return (
        <div style={{
            ...styles.container,
            height: 0.3 * WindowDimensions().height - 1,
            width: WindowDimensions().width - SIDE_MENU_WIDTH - EXPLORER_WIDTH
        }}>
            <div style={styles.labelContainer}>
                <p style={{ ...textStyles.terminalLabel, fontSize: 12 }}>TERMINAL</p>
            </div>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Money: ${money}</p>
        </div>
    );
}

export default Terminal;

const styles = {
    container: {
        backgroundColor: colours.main,
        borderTop: `1px solid ${colours.divider}`
    },
    labelContainer: {
        display: 'table',
        borderBottom: `1px solid rgba(204,204,204,1)`,
        marginLeft: 20,
        marginRight: 20
    }
}
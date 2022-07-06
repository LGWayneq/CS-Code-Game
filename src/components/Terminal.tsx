import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH } from '../assets/constants';
import { useAppSelector } from '../utils/redux/hooks'
import { getMoneyDisplay } from '../utils/MoneyManager';

function Terminal() {
    const money = useAppSelector(state => state.money.value)
    const cps = useAppSelector(state => state.cps.value)

    return (
        <div style={{
            ...styles.container,
            height: 0.3 * WindowDimensions().height - 41,
            width: WindowDimensions().width - SIDE_MENU_WIDTH - EXPLORER_WIDTH - 40
        }}>
            <div style={styles.labelContainer}>
                <body style={{ ...textStyles.terminalLabel, fontSize: 12, marginBottom: 10 }}>TERMINAL</body>
            </div>
            <div style={styles.moneyContainer}>
                <body style={styles.moneyLabel}>Money:</body>
                {getMoneyDisplay(money)}
            </div>
            <body style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Idle Typing Speed: {cps.toFixed(1)} characters per millisecond</body>
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
    moneyContainer: {
        display: 'flex', flexDirection: 'row' as 'row', 
        marginTop: 10
    },
    moneyLabel: {
        ...textStyles.terminalLabel, 
        fontSize: 14, 
        marginRight: 5, 
        alignSelf: 'flex-end' 
    },
    labelContainer: {
        display: 'table',
        borderBottom: `1px solid rgba(204,204,204,1)`,
    }
}
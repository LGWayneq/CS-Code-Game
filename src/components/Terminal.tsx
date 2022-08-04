import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH } from '../assets/constants';
import { useAppSelector } from '../utils/redux/hooks'
import { getFloatDisplay } from '../utils/MoneyManager';

function Terminal() {
    const money = useAppSelector(state => state.money.value)
    const cps = useAppSelector(state => state.cps.value)
    const cpk = useAppSelector(state => state.cpk.value)
    const mpl = useAppSelector(state => state.mpl.value)

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
                <b style={styles.textLabel}>Money:</b>
                {getFloatDisplay(money, false)}
            </div>
            <body style={styles.text}>
                <b style={styles.textLabel}>Idle Typing Speed:</b> {cps.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} character{cps > 1 && "s"}/second
            </body>
            <body style={styles.text}>
                <b style={styles.textLabel}>Keyboard Speed:</b>{cpk.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} character{cpk > 1 && "s"}/keypress
            </body>
            <body style={styles.text}>
                <b style={styles.textLabel}>Salary:</b>${mpl.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}/line
            </body>
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
    textLabel: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginRight: 5,
        alignSelf: 'flex-end'
    },
    labelContainer: {
        display: 'table',
        borderBottom: `1px solid rgba(204,204,204,1)`,
    },
    text: {
        ...textStyles.terminalLabel,
        fontSize: 14,
    }
}
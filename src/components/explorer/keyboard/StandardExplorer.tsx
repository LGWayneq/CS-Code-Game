import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { upgradesData } from '../../../assets/upgradesData';
import { useAppSelector } from '../../../utils/redux/hooks'
import KeyboardCard from './StandardCard';

function StandardExplorer() {
    const cpk = useAppSelector(state => state.cpk.value)

    return (
        <div style={styles.container}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>KEYBOARD</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>
                Current Keyboard Speed:<br/>{cpk} characters per keypress
            </p>
            {upgradesData.standard.map((upgrade, index) => {
                if (upgrade.baseCost.exponent < 60 )    //todo: temporarily limit displayed cards. implement money check for display
                return (
                    <KeyboardCard key={index} upgrade={upgrade}/>
                )
            })}
        </div>
    );
}

export default StandardExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        paddingLeft: 20,
        paddingRight: 20
    },
    qtyContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    qtyLabel: {
        ...textStyles.terminalLabel,
    },
    qty: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        cursor: 'pointer'
    }
}
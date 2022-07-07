import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH, TITLE_BAR_HEIGHT } from '../../../assets/constants';
import { upgradesData } from '../../../assets/upgradesData';
import getWindowDimensions from '../../../utils/WindowDimensions';
import StandardCard from './StandardCard';

function StandardExplorer() {
    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>KEYBOARD</p>
            {upgradesData.standard.map((upgrade, index) => {
                return (
                    <StandardCard key={index} upgrade={upgrade} />
                )
            })}
        </div>
    );
}

export default StandardExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 50,
        backgroundColor: colours.explorer,
        paddingBottom: 20
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
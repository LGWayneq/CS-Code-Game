import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { upgradesData } from '../../../assets/upgradesData';
import { useAppSelector } from '../../../utils/redux/hooks'
import StandardCard from './StandardCard';
import { ableToPurchase, FloatingPoint, multiply } from '../../../utils/MoneyManager';

function StandardExplorer() {
    const lifetimeMoney: FloatingPoint = useAppSelector(state => state.money.lifetime)
    const isStandardUpgradePurchased = useAppSelector(state => state.upgrades.isStandardUpgradePurchased)

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>UPGRADES</p>
            {upgradesData.standard.map((upgrade, index) => {
                if (!isStandardUpgradePurchased[index] && ableToPurchase(multiply(lifetimeMoney, 5), upgrade.baseCost)) {
                    return (
                        <StandardCard key={index} index={index} upgrade={upgrade} />
                    )
                }
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
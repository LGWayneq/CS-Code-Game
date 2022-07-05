import React, { useState } from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { EXPLORER_WIDTH } from '../assets/constants';
import { upgradesData } from '../assets/upgradesData';
import { useAppDispatch } from '../utils/redux/hooks';
import HiringCard from './HiringCard';

function Explorer() {
    const [purchaseQty, setPurchaseQty] = useState<number>(1)

    return (
        <div style={styles.container}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>HIRING</p>
            <div style={styles.qtyContainer}>
                <body style={styles.qtyLabel}>Purchase Qty: </body>
                <body style={styles.qty} onClick={() => setPurchaseQty(1)}>x1</body>
                <body style={styles.qty} onClick={() => setPurchaseQty(5)}>x5</body>
                <body style={styles.qty} onClick={() => setPurchaseQty(10)}>x10</body>
                <body style={styles.qty} onClick={() => setPurchaseQty(25)}>x25</body>
            </div>
            {upgradesData.hiring.map((upgrade, index) => {
                return (
                    <HiringCard key={index} upgrade={upgrade} purchaseQty={purchaseQty} />

                )
            })}
        </div>
    );
}

export default Explorer;

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
import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { upgradesData } from '../../../assets/upgradesData';
import { useAppSelector } from '../../../utils/redux/hooks';
import HiringCard from './HiringCard';

function HiringExplorer() {
    const hiring = useAppSelector(state => state.upgrades.hiring)
    const [purchaseQty, setPurchaseQty] = useState<number>(1)

    return (
        <div style={styles.container}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>HIRING</p>
            <div style={styles.qtyContainer}>
                <body style={styles.qtyLabel}>Purchase Qty: </body>
                <body style={purchaseQty == 1 ? styles.qtySelected : styles.qty} onClick={() => setPurchaseQty(1)}>x1</body>
                <body style={purchaseQty == 5 ? styles.qtySelected : styles.qty} onClick={() => setPurchaseQty(5)}>x5</body>
                <body style={purchaseQty == 10 ? styles.qtySelected : styles.qty} onClick={() => setPurchaseQty(10)}>x10</body>
                <body style={purchaseQty == 25 ? styles.qtySelected : styles.qty} onClick={() => setPurchaseQty(25)}>x25</body>
            </div>
            {upgradesData.hiring.map((upgrade, index) => {
                // if (index == 0 || hiring[index - 1].qty > 0) {
                    return (
                        <HiringCard key={index} upgrade={upgrade} purchaseQty={purchaseQty} />
                    )
                // }
            })}
        </div>
    );
}

export default HiringExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 50,
        backgroundColor: colours.explorer,
        paddingBottom: 20,
    },
    qtyContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    qtyLabel: {
        ...textStyles.terminalLabel,
        fontSize: 13,
    },
    qty: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        fontSize: 13,
        border: '1px grey solid',
        borderRadius: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 2,
        cursor: 'pointer'
    },
    qtySelected: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        fontSize: 13,
        border: '1px white solid',
        backgroundColor: colours.offwhite,
        color: colours.main,
        borderRadius: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 2,
        cursor: 'pointer'
    }
}
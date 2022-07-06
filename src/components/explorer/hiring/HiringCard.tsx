import React from 'react';
import { colours } from '../../../assets/colours';
import { HiringUpgradeType } from '../../../assets/upgradesData'
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppDispatch } from '../../../utils/redux/hooks';
import { useAppSelector } from '../../../utils/redux/hooks'
import { incrementCpsByAmount } from '../../../utils/redux/slices/cpsSlice'
import { decrementMoneyByAmount } from '../../../utils/redux/slices/moneySlice'
import { increaseHiringByAmount } from '../../../utils/redux/slices/upgradesSlide'
import { ableToPurchase, getMoneyDisplay, FloatingPoint } from '../../../utils/MoneyManager';

interface HiringCardProps {
    upgrade: HiringUpgradeType,
    purchaseQty: number
}

function HiringCard(props: HiringCardProps) {
    const hiring = useAppSelector(state => state.upgrades.hiring)
    const money = useAppSelector(state => state.money.value)
    const dispatch = useAppDispatch()

    const handleIncreaseHiring = (id: number, qty: number) => {
        const purchasePrice = calculateCost(props.upgrade.baseCost, qty)
        if (ableToPurchase(money, props.upgrade.baseCost)) {
            dispatch(increaseHiringByAmount({ id: id, qty: qty }))
            dispatch(decrementMoneyByAmount(purchasePrice))
            dispatch(incrementCpsByAmount(qty * props.upgrade.cps))
        }
    }

    const calculateCost = (baseCost: FloatingPoint, qty: number): FloatingPoint => {
        //todo: calculate purchase price non-linearly. probably need to use geometric summation
        return { base: baseCost.base * qty, exponent: baseCost.exponent }
    }

    return (
        <div style={styles.container}>
            <img style={styles.icon} src={props.upgrade.image} />
            <div>
                <body style={styles.name}>{props.upgrade.name} x{hiring[props.upgrade.id].qty}</body>
                <body style={styles.description}>{props.upgrade.description}</body>
                <div style={{ display: 'flex', flexDirection: 'row' as 'row' }}>
                    <body style={styles.costLabel}>Cost:</body>
                    {getMoneyDisplay(calculateCost(props.upgrade.baseCost, props.purchaseQty))}
                </div>
                <div style={styles.selectionContainer}>
                    <body style={styles.costLabel}>CPS: {props.upgrade.cps}</body>
                    <body style={styles.buy} onClick={() => handleIncreaseHiring(props.upgrade.id, props.purchaseQty)}>Hire {props.purchaseQty}</body>
                </div>
            </div>
        </div >
    );
}

export default HiringCard;

const styles = {
    container: {
        display: 'flex',
        maxWidth: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        flexDirection: 'row' as 'row',
        marginTop: 30,
    },
    icon: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        marginRight: 20
    },
    selectionContainer: {
        display: 'flex',
        width: EXPLORER_WIDTH - 130,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    name: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 5
    },
    description: {
        color: 'rgba(133,133,133,1)',
        fontSize: 14,
        marginBottom: 5
    },
    costLabel: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginBottom: 5,
        marginRight: 5
    },
    buy: {
        ...textStyles.terminalLabel,
        cursor: 'pointer'
    }
}
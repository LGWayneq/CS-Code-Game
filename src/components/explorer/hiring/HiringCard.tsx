import React from 'react';
import { colours } from '../../../assets/colours';
import { HiringUpgradeType } from '../../../assets/upgradesData'
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppDispatch } from '../../../utils/redux/hooks';
import { useAppSelector } from '../../../utils/redux/hooks'
import { incrementCpsByAmount } from '../../../utils/redux/slices/cpsSlice'
import { decrementMoneyByAmount } from '../../../utils/redux/slices/moneySlice'
import { increaseHiringByAmount } from '../../../utils/redux/slices/upgradesSlice'
import { ableToPurchase, getFloatDisplay, FloatingPoint, multiply, divide, subtract } from '../../../utils/MoneyManager';
import BuyButton from '../../ui/BuyButton';

interface HiringCardProps {
    upgrade: HiringUpgradeType,
    purchaseQty: number
}

function HiringCard(props: HiringCardProps) {
    const hiring = useAppSelector(state => state.upgrades.hiring)
    const money = useAppSelector(state => state.money.value)
    const tabs = useAppSelector(state => state.tabs.value)
    const dispatch = useAppDispatch()

    const handleIncreaseHiring = (id: number, qty: number) => {
        const purchasePrice = calculateCost(props.upgrade.baseCost, hiring[props.upgrade.id].qty, qty)
        if (ableToPurchase(money, purchasePrice)) {
            dispatch(increaseHiringByAmount({ id: id, qty: qty }))
            dispatch(decrementMoneyByAmount(purchasePrice))
            dispatch(incrementCpsByAmount(tabs * qty * props.upgrade.cps))
        }
    }

    const calculateCost = (baseCost: FloatingPoint, purchasedQty: number, qty: number): FloatingPoint => {
        const r = 1.5
        //Geometric summation
        const purchasedTop = multiply(baseCost, Math.pow(r, purchasedQty) - 1)
        const purchasedBottom = r - 1
        const costOfPurchased = divide(purchasedTop, purchasedBottom)
        //Geometric summation
        const top = multiply(baseCost, Math.pow(r, purchasedQty + qty) - 1)
        const bottom = r - 1
        const totalCost = divide(top, bottom)
        return subtract(totalCost, costOfPurchased)
    }

    return (
        <div style={styles.container}>
            <img style={styles.icon} src={props.upgrade.image} />
            <div>
                <body style={styles.name}>{props.upgrade.name} x{hiring[props.upgrade.id].qty}</body>
                <body style={styles.description}>{props.upgrade.description}</body>
                <div style={styles.costContainer}>
                    <body style={styles.costLabel}>Cost:</body>
                    {getFloatDisplay(calculateCost(props.upgrade.baseCost, hiring[props.upgrade.id].qty, props.purchaseQty))}
                </div>
                <div style={styles.selectionContainer}>
                    <body style={styles.costLabel}>CPS: {props.upgrade.cps}</body>
                    <BuyButton
                        disabled={!ableToPurchase(money, calculateCost(props.upgrade.baseCost, hiring[props.upgrade.id].qty, props.purchaseQty))}
                        onClick={() => handleIncreaseHiring(props.upgrade.id, props.purchaseQty)}>
                        {`Hire ${props.purchaseQty}`}
                    </BuyButton>
                </div>
            </div>
        </div >
    );
}

export default HiringCard;

const styles = {
    container: {
        display: 'flex',
        width: EXPLORER_WIDTH - 40,
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
        width: EXPLORER_WIDTH - 120,
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
    costContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        height: 20,
        alignItems: 'flex-end' as 'flex-end',
        marginTop: 5
    },
    costLabel: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        alignSelf: 'flex-end' as 'flex-end',
        marginRight: 5
    }
}
import React from 'react';
import { colours } from '../../../assets/colours';
import { UpgradeType } from '../../../assets/upgradesData'
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppDispatch } from '../../../utils/redux/hooks';
import { useAppSelector } from '../../../utils/redux/hooks'
import { incrementByAmount } from '../../../utils/redux/slices/cpsSlice'
import { decrementByAmount } from '../../../utils/redux/slices/moneySlice'
import { increaseHiringByAmount } from '../../../utils/redux/slices/upgradesSlide'

interface HiringCardProps {
    upgrade: UpgradeType,
    purchaseQty: number
}

function HiringCard(props: HiringCardProps) {
    const hiring = useAppSelector(state => state.upgrades.hiring)
    const money = useAppSelector(state => state.money.value)
    const dispatch = useAppDispatch()

    const handleIncreaseHiring = (id: number, qty: number) => {
        const purchasePrice = calculateCost(props.upgrade.baseCost, qty)
        if (money > purchasePrice) {
            dispatch(increaseHiringByAmount({ id: id, qty: qty }))
            dispatch(decrementByAmount(purchasePrice))
            dispatch(incrementByAmount(qty * props.upgrade.cps))
        }
    }

    const calculateCost = (baseCost: number, qty: number) => {
        //todo: calculate purchase price non-linearly
        return qty * baseCost
    }

    return (
        <div style={styles.container}>
            <img style={styles.icon} src={props.upgrade.image} />
            <div>
                <body style={styles.name}>{props.upgrade.name} x{hiring[props.upgrade.id].qty}</body>
                <body style={styles.description}>{props.upgrade.description}</body>
                <body style={styles.cost}>Cost: ${calculateCost(props.upgrade.baseCost, props.purchaseQty)}</body>
                <div style={styles.selectionContainer}>
                    <body style={styles.cost}>CPS: {props.upgrade.cps}</body>
                    <body style={styles.buy} onClick={() => handleIncreaseHiring(props.upgrade.id, props.purchaseQty)}>Hire</body>
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
        height: 60,
        width: 60,
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
    cost: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginBottom: 5
    },
    buy: {
        ...textStyles.terminalLabel,
        cursor: 'pointer'
    }
}
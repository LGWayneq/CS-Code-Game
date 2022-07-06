import React from 'react';
import { colours } from '../../../assets/colours';
import { BaseUpgradeType } from '../../../assets/upgradesData'
import { textStyles } from '../../../assets/textStyles';
import { ableToPurchase, getMoneyDisplay } from '../../../utils/MoneyManager';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppDispatch } from '../../../utils/redux/hooks';
import { useAppSelector } from '../../../utils/redux/hooks'
import { incrementByAmount } from '../../../utils/redux/slices/cpkSlice'
import { decrementMoneyByAmount } from '../../../utils/redux/slices/moneySlice'
import { increaseKeyboardByAmount } from '../../../utils/redux/slices/upgradesSlide'

interface KeyboardCardProps {
    upgrade: BaseUpgradeType
}

function KeyboardCard(props: KeyboardCardProps) {
    const money = useAppSelector(state => state.money.value)
    const dispatch = useAppDispatch()

    const handleBuyKeyboard = (keyboard: BaseUpgradeType) => {
        if (ableToPurchase(money, props.upgrade.baseCost)) {
            dispatch(increaseKeyboardByAmount(1))
            // dispatch(decrementByAmount(props.upgrade.baseCost))
            dispatch(incrementByAmount(1))
        }
    }

    return (
        <div style={styles.container}>
            <div>
                <body style={styles.name}>{props.upgrade.name}</body>
                <div style={styles.detailsContainer}>
                    <body style={styles.cpk}>
                        CPK:
                    </body>
                    {getMoneyDisplay(props.upgrade.baseCost)}
                </div>
            </div>
            <body style={styles.buy} onClick={() => handleBuyKeyboard(props.upgrade)}>Buy</body>
        </div >
    );
}

export default KeyboardCard;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        maxWidth: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        justifyContent: 'space-between' as 'space-between',
        marginTop: 30,
    },
    icon: {
        height: 60,
        width: 60,
        alignSelf: 'center',
        marginRight: 20
    },
    detailsContainer: {
        display: 'flex',
        width: 100,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
    },
    name: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 5
    },
    cpk: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        alignSelf: 'flex-end' as 'flex-end'
    },
    buy: {
        ...textStyles.terminalLabel,
        alignSelf: 'flex-end' as 'flex-end',
        cursor: 'pointer'
    }
}
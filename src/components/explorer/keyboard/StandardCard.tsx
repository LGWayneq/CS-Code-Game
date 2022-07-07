import React from 'react';
import { colours } from '../../../assets/colours';
import { StandardUpgrade, StandardUpgradeType } from '../../../assets/upgradesData'
import { textStyles } from '../../../assets/textStyles';
import { ableToPurchase, getMoneyDisplay } from '../../../utils/MoneyManager';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppDispatch } from '../../../utils/redux/hooks';
import { useAppSelector } from '../../../utils/redux/hooks'
import { incrementCpkByAmount } from '../../../utils/redux/slices/cpkSlice'
import { incrementMplByAmount } from '../../../utils/redux/slices/mplSlice';
import { decrementMoneyByAmount } from '../../../utils/redux/slices/moneySlice'
import { purchaseStandardUpgrade } from '../../../utils/redux/slices/upgradesSlide'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TabIcon from '@mui/icons-material/Tab';
import PaidIcon from '@mui/icons-material/Paid';

interface StandardCardProps {
    index: number,
    upgrade: StandardUpgrade
}

function StandardCard(props: StandardCardProps) {
    const money = useAppSelector(state => state.money.value)
    const dispatch = useAppDispatch()

    const handleBuyUpgrade = (upgrade: StandardUpgrade) => {
        if (ableToPurchase(money, upgrade.baseCost)) {
            if (upgrade.type == StandardUpgradeType.KEYBOARD) {
                dispatch(incrementCpkByAmount(1))
            } else if (upgrade.type == StandardUpgradeType.PROMOTION) {
                dispatch(incrementMplByAmount(1))
            } else if (upgrade.type == StandardUpgradeType.TABS) {
                //to be implemented
            }
            dispatch(purchaseStandardUpgrade(props.index))
            dispatch(decrementMoneyByAmount(upgrade.baseCost))
        }
    }

    return (
        <div style={styles.container}>
            {props.upgrade.type === StandardUpgradeType.KEYBOARD && <KeyboardIcon sx={styles.icon} />}
            {props.upgrade.type === StandardUpgradeType.TABS && <TabIcon sx={styles.icon} />}
            {props.upgrade.type === StandardUpgradeType.PROMOTION && <PaidIcon sx={styles.icon} />}
            <div>
                <body style={styles.name}>{props.upgrade.name}</body>
                <body style={styles.description}>{props.upgrade.description}</body>
                <div style={styles.detailsContainer}>
                    <body style={styles.label}>
                        Cost:
                    </body>
                    {getMoneyDisplay(props.upgrade.baseCost)}
                    <body style={styles.buy} onClick={() => handleBuyUpgrade(props.upgrade)}>Buy</body>
                </div>
            </div>
        </div >
    );
}

export default StandardCard;

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
        color: '#FFFEFD',
        height: 50,
        width: 50,
        alignSelf: 'center',
        marginRight: 2
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'flex-end' as 'flex-end'
    },
    name: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 5
    },
    description: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginBottom: 5
    },
    label: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginRight: 5,
        alignSelf: 'flex-end' as 'flex-end'
    },
    buy: {
        ...textStyles.terminalLabel,
        alignSelf: 'center' as 'center',
        marginLeft: 'auto',
        cursor: 'pointer'
    }
}
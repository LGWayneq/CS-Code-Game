import React, { useState, useEffect } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppSelector, useAppDispatch } from '../../../utils/redux/hooks'
import { restartDay } from '../../../utils/redux/slices/dayStartSlice';
import { incrementMplByAmount } from '../../../utils/redux/slices/mplSlice';
import { numberToFloatDisplay } from '../../../utils/MoneyManager';
import BuyButton from '../../ui/BuyButton';
import { resetMoney } from '../../../utils/redux/slices/moneySlice';
import { calculateTimeElapsed } from '../../../utils/DateTime';

function EnddayExplorer() {
    const [numberOfPromotions, setNumberOfPromotions] = useState<number>(0)
    const lifetimeMoney = useAppSelector(state => state.money.lifetime)
    const dayStart: string = useAppSelector(state => state.dayStart.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const calculatePromotions = setInterval(() => setNumberOfPromotions(getNumberOfPromotions()), 100)

        return () => clearInterval(calculatePromotions)
    }, [numberOfPromotions, dayStart])

    const getNumberOfPromotions = (): number => {
        const timeElapsed = calculateTimeElapsed(new Date(dayStart))
        const TEN_MINUTES = 10 * 60
        if (timeElapsed >= TEN_MINUTES) {
            const root = 3
            const lifetimeMoneyInt = Math.pow(lifetimeMoney.base, 1 / root) * Math.pow(2, Math.pow(lifetimeMoney.exponent, 1 / root))
            const rootedTimeGap = Math.pow(timeElapsed - TEN_MINUTES, 1 / root)
            const multiplier = Math.pow(lifetimeMoneyInt, 1 / root)
            return Math.floor(rootedTimeGap * multiplier)
        } else {
            return 0
        }
    }

    const handleEndDay = () => {
        dispatch(restartDay())
        dispatch(resetMoney())
        dispatch(incrementMplByAmount(numberOfPromotions))  //for now promotions add to mpl
    }

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>CLOCKOUT</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>End your day to get a pay raise!</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>You lose all the money you currently have, but you will get more money for each line of code you type!</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Get larger pay raises the longer your days are!</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Current Day Duration: {(calculateTimeElapsed(new Date(dayStart)) / 60).toFixed(1)} mins</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14, ...styles.flexContainer }}>
                Current Pay Raise: <b style={{ marginLeft: 5 }}>$</b><b>{numberToFloatDisplay(numberOfPromotions)}</b>
            </p>
            <BuyButton
                style={styles.button}
                onClick={() => handleEndDay()}>
                CLOCKOUT
            </BuyButton>
        </div>
    );
}

export default EnddayExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 50,
        backgroundColor: colours.explorer,
        paddingBottom: 20
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'flex-end' as 'flex-end'
    },
    button: {
        height: 28,
        paddingTop: 8,
    }
}
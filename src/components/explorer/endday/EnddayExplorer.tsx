import React, { useState, useEffect } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppSelector, useAppDispatch } from '../../../utils/redux/hooks'
import { restartDay } from '../../../utils/redux/slices/dayStartSlice';
import { incrementMplByAmount } from '../../../utils/redux/slices/mplSlice';

function EnddayExplorer() {
    const [numberOfPromotions, setNumberOfPromotions] = useState<number>(0)
    const dayStart: string = useAppSelector(state => state.dayStart.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const calculatePromotions = setInterval(() => setNumberOfPromotions(getNumberOfPromotions()), 100)

        return () => clearInterval(calculatePromotions)
    }, [numberOfPromotions, dayStart])

    const calculateTimeElapsed = (dayStart: Date): number => {
        return new Date().getTime() - dayStart.getTime()
    }

    const getNumberOfPromotions = (): number => {
        //todo: refine how number of promotions is determined. for now do 1 promotion per 2 mins?
        const divisor = 1000 * 60 * 2
        return Math.round(calculateTimeElapsed(new Date(dayStart)) / divisor)
    }

    const handleEndDay = () => {
        dispatch(restartDay())
        dispatch(incrementMplByAmount(numberOfPromotions))  //for now promotions add to mpl
    }

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>CLOCKOUT</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>End your day to be promoted!</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>You earn more promotions the longer your days are!</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>You will be promoted <b>{numberOfPromotions}</b> times if you end your day now!</p>
            <div style={styles.buttonContainer} onClick={() => handleEndDay()}>
                <body style={styles.buttonText}>CLOCKOUT</body>
            </div>
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
    },
    buttonContainer: {
        width: EXPLORER_WIDTH - 50,
        border: `1px ${colours.offwhite} solid`,
        borderRadius: 20,
        textAlign: 'center' as 'center',
        paddingTop: 5,
        paddingBottom: 5,
        cursor: 'pointer'

    },
    buttonText: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
    }
}
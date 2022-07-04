import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { EXPLORER_WIDTH } from '../assets/constants';
import { incrementByAmount, decrementByAmount } from '../utils/redux/slices/cpmsSlice'
import { useAppDispatch } from '../utils/redux/hooks';
import UpgradeCard from './UpgradeCard';

function Explorer() {
    const dispatch = useAppDispatch()
    return (
        <div style={styles.container}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>HIRING</p>
            <button onClick={() => dispatch(incrementByAmount(1))}>Increase CPMS by 1</button>
            <UpgradeCard/>
        </div>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH,
        backgroundColor: colours.explorer,
        paddingLeft: 20
    }
}
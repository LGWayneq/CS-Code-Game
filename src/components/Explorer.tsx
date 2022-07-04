import React from 'react';
import { colours } from '../assets/colours';
import { EXPLORER_WIDTH } from '../assets/constants';
import { incrementByAmount, decrementByAmount } from '../utils/redux/cpmsSlice'
import { useAppDispatch } from '../utils/redux/hooks';

function Explorer() {
    const dispatch = useAppDispatch()
    return (
        <div style={styles.container}>
            <button onClick={() => dispatch(incrementByAmount(1))}>Increase CPMS by 1</button>
        </div>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH,
        backgroundColor: colours.explorer,
    }
}
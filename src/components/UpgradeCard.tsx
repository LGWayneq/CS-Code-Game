import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { EXPLORER_WIDTH } from '../assets/constants';
import { useAppDispatch } from '../utils/redux/hooks';

function UpgradeCard() {
    const dispatch = useAppDispatch()

    return (
        <div style={styles.container}>
            <image />
            <div>
                <body style={textStyles.terminalLabel}>Label</body>
                <body style={textStyles.terminalLabel}>Description</body>
                <div style={styles.selectionContainer}>
                    <body style={textStyles.terminalLabel}>+1</body>
                    <body style={textStyles.terminalLabel}>+5</body>
                    <body style={textStyles.terminalLabel}>+10</body>
                    <body style={textStyles.terminalLabel}>MAX</body>
                </div>
            </div>
        </div>
    );
}

export default UpgradeCard;

const styles = {
    container: {
        display: 'flex',
        width: EXPLORER_WIDTH,
        backgroundColor: colours.explorer,
        flexDirection: 'row' as 'row'
    },
    selectionContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row'
    }
}
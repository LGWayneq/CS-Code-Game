import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import BuyButton from '../../ui/BuyButton';
import ReportBugModal from './ReportBugModal';
import FeedbackModal from './FeedbackModal';

function InfoExplorer(props: { setOverlay: Function }) {
    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>INFORMATION</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>
                Made by a bored CS student, using React and Redux.
            </p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>
                Feel free to report any bugs, or give any feedback!
            </p>
            <BuyButton
                style={{ ...styles.button, marginTop: 20, marginBottom: 20 }}
                onClick={() => props.setOverlay(<ReportBugModal setOverlay={(overlay: JSX.Element) => props.setOverlay(overlay)} />)}>
                Report Bug
            </BuyButton>
            <BuyButton
                style={styles.button}
                onClick={() => props.setOverlay(<FeedbackModal setOverlay={(overlay: JSX.Element) => props.setOverlay(overlay)} />)}>
                Feedback
            </BuyButton>
        </div>
    );
}

export default InfoExplorer;

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
    button: {
        height: 28,
        paddingTop: 8,
    }
}
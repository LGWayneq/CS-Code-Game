import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import BuyButton from '../../ui/BuyButton';
import Dropdown from '../../ui/dropdown/Dropdown';
import Modal from '../../ui/Modal';

const BUGTYPES = ["UI", "Gameplay", "Performance", "Others"]

function ReportBugModal() {
    const [bugType, setBugType] = useState<string>("UI")

    const handleSelection = (value: string) => {
        setBugType(value)
    }

    return (
        <Modal>
            <div style={styles.container}>
                <body style={styles.title}>Report Bug</body>
                <body style={styles.selectLabel}>Bug Type</body>
                <Dropdown
                    value={bugType}
                    onChange={handleSelection}
                    options={BUGTYPES} />
                <body style={styles.inputLabel}>Description</body>
                <input
                    style={styles.input} />
            </div>
        </Modal>
    );
}

export default ReportBugModal;

const styles = {
    container: {
        height: '50vh',
        width: 500,
        borderRadius: 25,
        backgroundColor: colours.menu,
        padding: 20
    },
    title: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        fontSize: 16,
    },
    selectLabel: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10
    },
    inputLabel:{
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10
    },
    input: {
        backgroundColor: colours.explorer,
        borderRadius: 5,
        width: 490
    }
}
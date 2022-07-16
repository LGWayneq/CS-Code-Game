import React, { SyntheticEvent, useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import BuyButton from '../../ui/BuyButton';
import Dropdown from '../../ui/dropdown/Dropdown';
import Modal from '../../ui/Modal';
import { sendEmail } from '../../../utils/email/EmailFunctions';

const BUGTYPES = ["UI", "Gameplay", "Performance", "Others"]

function ReportBugModal(props: { onDismiss: Function }) {
    const [bugType, setBugType] = useState<string>(BUGTYPES[0])
    const [description, setDescription] = useState<string>("")

    const handleSelection = (value: string) => {
        setBugType(value)
    }

    const handleSubmit = () => {
        sendEmail({ BUGTYPE: bugType, DESCRIPTION: description, DATE: new Date() })
        props.onDismiss()
    }

    return (
        <Modal
            onDismiss={() => props.onDismiss()}>
            <div style={styles.container}>
                <body style={styles.title}>Report Bug</body>
                <body style={styles.selectLabel}>Bug Type</body>
                <Dropdown
                    value={bugType}
                    onChange={handleSelection}
                    options={BUGTYPES} />
                <body style={styles.inputLabel}>Description</body>
                <textarea
                    style={styles.input}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />
                <BuyButton
                    style={styles.button}
                    onClick={() => handleSubmit()}>
                    Submit
                </BuyButton>
            </div>
        </Modal>
    );
}

export default ReportBugModal;

const styles = {
    container: {
        height: 450,
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
    inputLabel: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10
    },
    input: {
        ...textStyles.terminalLabel,
        fontFamily: 'Segoe UI',
        fontSize: 14,
        backgroundColor: colours.explorer,
        borderRadius: 5,
        borderWidth: 0,
        height: 200,
        width: 480,
        padding: 10,
    },
    button: {
        width: 80,
        height: 30,
        paddingTop: 7,
        marginTop: 20,
        marginLeft: 'auto'
    }
}
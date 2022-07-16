import { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import BuyButton from '../../ui/BuyButton';
import Modal from '../../ui/Modal';
import Snackbar from '../../ui/Snackbar';
import { sendFeedback } from '../../../utils/email/EmailFunctions';


function FeedbackModal(props: { setOverlay: Function }) {
    const [description, setDescription] = useState<string>("")

    const handleSubmit = () => {
        sendFeedback({ DESCRIPTION: description, DATE: new Date() })
        props.setOverlay(<Snackbar>Thank you for your feedback!</Snackbar>)
    }

    return (
        <Modal
            onDismiss={() => props.setOverlay(<></>)}>
            <div style={styles.container}>
                <body style={styles.title}>Feedback</body>
                <body style={styles.inputLabel}>Please enter your feedback below:</body>
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

export default FeedbackModal;

const styles = {
    container: {
        height: 360,
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
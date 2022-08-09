import { useEffect, useState } from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { calculateTimeElapsed, formatToString } from '../utils/DateTime';
import { useAppSelector } from '../utils/redux/hooks';
import BuyButton from './ui/BuyButton';
import Modal from './ui/Modal';

function ResumeModal(props: { setOverlay: Function }) {
    const lastFocused = useAppSelector(state => state.session.lastFocused)
    const currentLine = useAppSelector(state => state.codingArea.currentLine)
    const mpl = useAppSelector(state => state.mpl.value)
    const [initialLine, setInitialLine] = useState<number>(-1)
    const [updatedLine, setUpdatedLine] = useState<number>(-1)
    const [formattedTimeElapsed, setFormattedTimeElapsed] = useState<string>("")

    useEffect(() => {
        setInitialLine(currentLine)
        formatTimeElapsed()
    }, [])

    useEffect(() => {
        if (updatedLine == -1 && initialLine != -1 && currentLine != initialLine) {
            setUpdatedLine(currentLine)
        }
    }, [currentLine, initialLine])

    const calculateLinesTyped = () => {
        if (initialLine != -1 && updatedLine != -1) {
            return Math.abs(updatedLine - initialLine)
        } else {
            return 0
        }
    }

    const calculateMoneyEarned = () => {
        return mpl * calculateLinesTyped()
    }

    const formatTimeElapsed = () => {
        if (formattedTimeElapsed == "") {
            const timeElapsedNumber = calculateTimeElapsed(new Date(lastFocused))
            const timeElapsedString = formatToString(timeElapsedNumber)
            setFormattedTimeElapsed(timeElapsedString)
            return timeElapsedString
        }
    }

    return (
        <Modal
            onDismiss={() => props.setOverlay(<></>)}>
            <div style={styles.container}>
                <body style={styles.title}>Welcome Back!</body>
                <body style={styles.body}>You were gone for {formattedTimeElapsed}.</body>
                <body style={styles.body}>While you were gone:</body>
                <body style={{ ...styles.body, fontWeight: 700 }}>You typed {calculateLinesTyped()} lines of code.</body>
                <body style={{ ...styles.body, fontWeight: 700 }}>You earned ${calculateMoneyEarned()}.</body>
                <BuyButton
                    style={styles.button}
                    onClick={() => props.setOverlay(<></>)}>
                    Continue
                </BuyButton>
            </div>
        </Modal>
    );
}

export default ResumeModal;

const styles = {
    container: {
        height: 190,
        width: 250,
        borderRadius: 25,
        backgroundColor: colours.menu,
        padding: 20
    },
    title: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 20
    },
    body: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginBottom: 5
    },
    button: {
        width: 80,
        height: 30,
        paddingTop: 7,
        marginTop: 20,
    }
}
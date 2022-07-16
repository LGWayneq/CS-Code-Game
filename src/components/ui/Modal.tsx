import { useState, useEffect } from 'react'

interface ModalProps {
    children: JSX.Element
    onDismiss: Function
}

function Modal(props: ModalProps) {
    const [contentClicked, setContentClicked] = useState<boolean>(false)
    const [backgroundClicked, setBackgroundClicked] = useState<boolean>(false)

    useEffect(() => {
        if (backgroundClicked && !contentClicked) {
            props.onDismiss()
        }
        setContentClicked(false)
        setBackgroundClicked(false)
    }, [contentClicked, backgroundClicked])

    return (
        <div
            style={styles.background}
            onClick={() => setBackgroundClicked(true)}>
            <div
                onClick={() => setContentClicked(true)}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;

const styles = {
    background: {
        display: 'flex',
        position: 'absolute' as 'absolute',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    },
}
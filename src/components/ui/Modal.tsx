function Modal(props: { children: JSX.Element }) {
    return (
        <div style={styles.background}>
            {props.children}
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
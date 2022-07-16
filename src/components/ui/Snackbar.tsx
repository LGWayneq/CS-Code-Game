import { useEffect } from 'react'

interface SnackbarProps {
    children: JSX.Element
}

function Snackbar(props: SnackbarProps) {

    useEffect(() => {
       
    }, [])

    return (
        <div>
            
        </div>
    );
}

export default Snackbar;

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
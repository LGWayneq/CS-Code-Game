import React, { useEffect, useState } from 'react';
import { colours } from '../assets/colours';

function TextCursor() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(!visible)
        }, 600);

        return () => clearInterval(interval)
    }, [visible])

    return (
        <>
            {visible && <div style={styles.container} />}
        </>
    );
}

export default TextCursor;

const styles = {
    container: {
        backgroundColor: colours.cursor,
        height: 20,
        width: 2,
        marginTop: 16,
    },

}
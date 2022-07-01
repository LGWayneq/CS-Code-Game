import React from 'react';
import { colours } from '../assets/colours';

function CodeLine() {
    return (
        <div style={styles.container}>
        </div>
    );
}

export default CodeLine;

const styles = {
    container: {
        flexGrow: 1,
        backgroundColor: colours.main,
        justifyContent: 'center',
    }
}
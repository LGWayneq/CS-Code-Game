import React from 'react';
import { colours } from '../assets/colours';

function CodingArea() {
    return (
        <div style={styles.container}>
        </div>
    );
}

export default CodingArea;

const styles = {
    container: {
        flexGrow: 1,
        backgroundColor: colours.main,
        justifyContent: 'center',
    }
}
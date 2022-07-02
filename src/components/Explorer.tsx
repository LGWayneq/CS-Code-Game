import React from 'react';
import { colours } from '../assets/colours';
import { EXPLORER_WIDTH } from '../assets/constants';

function Explorer() {
    return (
        <div style={styles.container}>
        </div>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH,
        backgroundColor: colours.explorer,
    }
}
import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles'

function TitleBar() {
    return (
        <div style={styles.container}>
            <header style={textStyles.title}>Clicker Game</header>
        </div>
    );
}

export default TitleBar;

const styles = {
    container: {
        display: 'flex',
        backgroundColor: colours.titleBar,
        height: 30,
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
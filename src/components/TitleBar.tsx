import React from 'react';
import { colours } from '../assets/colours';

function TitleBar() {
    return (
        <div style={styles.container}>
            <header>Clicker Game</header>
        </div>
    );
}

export default TitleBar;

const styles = {
    container: {
        backgroundColor: colours.titleBar,
        height: 30,
        width: '100vw',
        
    }
}
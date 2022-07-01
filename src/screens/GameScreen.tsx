import React from 'react';
import { colours } from '../assets/colours';
import TitleBar from '../components/TitleBar';

function GameScreen() {
    return (
        <div style={styles.container}>
            <TitleBar/>
        </div>
    );
}

export default GameScreen;

const styles = {
    container: {
        backgroundColor: colours.main,
        height: '100vh',
        width: '100vw'
    }
}
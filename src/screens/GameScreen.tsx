import React from 'react';
import { colours } from '../assets/colours';
import TitleBar from '../components/TitleBar';
import SideMenu from '../components/SideMenu';
import Explorer from '../components/Explorer';
import CodingArea from '../components/CodingArea';
import Terminal from '../components/Terminal';

function GameScreen() {
    return (
        <div style={styles.container}>
            <TitleBar />
            <div style={styles.subContainer}>
                <SideMenu />
                <Explorer />
                <div>
                    <CodingArea />
                    <Terminal />
                </div>
            </div>
        </div>
    );
}

export default GameScreen;

const styles = {
    container: {
        backgroundColor: colours.main,
        height: '100vh',
        width: '100vw'
    },
    subContainer: {
        display: 'flex',
        width: '100vw',
        flexDirection: 'row' as 'row'
    },
}
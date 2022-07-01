import React from 'react';
import { colours } from '../assets/colours';

function SideMenu() {
    return (
        <div style={styles.container}>
        </div>
    );
}

export default SideMenu;

const styles = {
    container: {
        display: 'flex',
        backgroundColor: colours.menu,
        height: '100vh',
        width: 40,
        justifyContent: 'center',
        padding: 5
    }
}
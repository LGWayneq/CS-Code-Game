import React from 'react';
import { colours } from '../assets/colours';
import WindowDimensions from '../utils/WindowDimensions';

function SideMenu() {
    return (
        <div style={{ ...styles.container, height: WindowDimensions().height - titleBarHeight - 2 * padding }}>
        </div>
    );
}

export default SideMenu;

const titleBarHeight = 30
const padding = 5

const styles = {
    container: {
        display: 'flex',
        backgroundColor: colours.menu,
        width: 40,
        justifyContent: 'center',
        padding: padding
    }
}
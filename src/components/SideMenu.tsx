import React from 'react';
import { colours } from '../assets/colours';
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, TITLE_BAR_HEIGHT } from '../assets/constants';

function SideMenu() {
    return (
        <div style={{ ...styles.container, height: WindowDimensions().height - TITLE_BAR_HEIGHT - 2 * padding }}>
        </div>
    );
}

export default SideMenu;

const padding = 5

const styles = {
    container: {
        display: 'flex',
        backgroundColor: colours.menu,
        width: SIDE_MENU_WIDTH,
        justifyContent: 'center',
        padding: padding
    }
}
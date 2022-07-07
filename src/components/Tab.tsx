import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles'
import { TAB_HEIGHT } from '../assets/constants';

function Tab() {
    return (
        <div style={styles.container}>

        </div>
    );
}

export default Tab;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        backgroundColor: colours.main,
        height: TAB_HEIGHT,
        width: 125,
        alignItems: 'center'
    }
}
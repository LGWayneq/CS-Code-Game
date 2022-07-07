import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles'

function TabsNavigator() {
    return (
        <div style={styles.container}>
            
        </div>
    );
}

export default TabsNavigator;

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
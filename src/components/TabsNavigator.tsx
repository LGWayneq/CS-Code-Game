import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles'
import WindowDimensions from '../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, EXPLORER_WIDTH, TAB_HEIGHT } from '../assets/constants';
import Tab from './Tab';

interface TabNavigatorProps {
    tabs: number,
    currentTab: number,
    setCurrentTab: Function
}

function TabsNavigator(props: TabNavigatorProps) {
    return (
        <div style={{
            ...styles.container,
            width: WindowDimensions().width - SIDE_MENU_WIDTH - EXPLORER_WIDTH,
        }}>
            {[...Array(props.tabs)].map((tab, index) => {
                return (
                    <Tab
                        key={index}
                        index={index}
                        setCurrentTab={(value: number) => props.setCurrentTab(value)}
                        isActive={index == props.currentTab} />
                )
            })}
        </div>
    );
}

export default TabsNavigator;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        backgroundColor: colours.explorer,
        height: TAB_HEIGHT,
        alignItems: 'center'
    }
}
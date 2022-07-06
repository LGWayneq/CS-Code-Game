import React from 'react';
import { colours } from '../../assets/colours';
import WindowDimensions from '../../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, TITLE_BAR_HEIGHT } from '../../assets/constants';
import PeopleIcon from '@mui/icons-material/People';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import { ExplorerStates } from './Explorer'

interface SideMenuProps {
    setExplorerState: Function
}

function SideMenu(props: SideMenuProps) {
    return (
        <div style={{ ...styles.container, height: WindowDimensions().height - TITLE_BAR_HEIGHT - 2 * padding }}>
            <PeopleIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.HIRING)}/>
            <ConstructionIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.STANDARD)}/>
            <SettingsIcon sx={{...styles.icon, marginTop: 'auto'}}/>
        </div>
    );
}

export default SideMenu;

const padding = 5

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        backgroundColor: colours.menu,
        width: SIDE_MENU_WIDTH,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: padding
    },
    icon: {
        color: 'white',
        margin: 1,
        cursor: 'pointer'
    }
}
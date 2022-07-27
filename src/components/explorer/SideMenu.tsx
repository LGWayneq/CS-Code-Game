import { colours } from '../../assets/colours';
import WindowDimensions from '../../utils/WindowDimensions';
import { SIDE_MENU_WIDTH, TITLE_BAR_HEIGHT } from '../../assets/constants';
import PeopleIcon from '@mui/icons-material/People';
import ConstructionIcon from '@mui/icons-material/Construction';
import WorkIcon from '@mui/icons-material/Work';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { ExplorerStates } from './Explorer'

interface SideMenuProps {
    explorerState: ExplorerStates
    setExplorerState: Function
    alerts: any
}

function SideMenu(props: SideMenuProps) {
    return (
        <div style={{ ...styles.container, height: WindowDimensions().height - TITLE_BAR_HEIGHT - 2 * padding }}>
            <div style={styles.iconContainer}>
                {props.explorerState == ExplorerStates.HIRING ? <div style={styles.highlight} /> : <div style={styles.unhighlight} />}
                <PeopleIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.HIRING)} />
            </div>
            <div style={styles.iconContainer}>
                {props.explorerState == ExplorerStates.STANDARD ? <div style={styles.highlight} /> : <div style={styles.unhighlight} />}
                <ConstructionIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.STANDARD)} />
                {props.alerts[ExplorerStates.STANDARD] && <PriorityHighIcon sx={styles.iconAlert}/>}
            </div>
            <div style={styles.iconContainer}>
                {props.explorerState == ExplorerStates.PROJECTS ? <div style={styles.highlight} /> : <div style={styles.unhighlight} />}
                <WorkIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.PROJECTS)} />
                {props.alerts[ExplorerStates.PROJECTS] && <PriorityHighIcon sx={styles.iconAlert}/>}
            </div>
            <div style={styles.iconContainer}>
                {props.explorerState == ExplorerStates.ENDDAY ? <div style={styles.highlight} /> : <div style={styles.unhighlight} />}
                <ScheduleIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.ENDDAY)} />
            </div>
            <div style={{ ...styles.iconContainer, marginTop: 'auto' }}>
                {props.explorerState == ExplorerStates.INFO ? <div style={styles.highlight} /> : <div style={styles.unhighlight} />}
                <InfoOutlinedIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.INFO)} />
            </div>
            <div style={{ ...styles.iconContainer }}>
                {props.explorerState == ExplorerStates.SETTINGS ? <div style={styles.highlight} /> : <div style={styles.unhighlight} />}
                <SettingsIcon sx={styles.icon} onClick={() => props.setExplorerState(ExplorerStates.SETTINGS)} />
            </div>
        </div>
    );
}

export default SideMenu;

const padding = 0

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        backgroundColor: colours.menu,
        width: SIDE_MENU_WIDTH,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'flex-start' as 'flex-start',
        marginBottom: 10
    },
    icon: {
        color: colours.offwhite,
        height: SIDE_MENU_WIDTH - 30,
        width: SIDE_MENU_WIDTH - 20,
        margin: 1,
        cursor: 'pointer'
    },
    iconAlert:{
        color: colours.offwhite,
        height: 15,
        width: 15,
        position: 'absolute',
        marginTop: -1,
        marginLeft: 5,
    },
    highlight: {
        width: 2,
        height: SIDE_MENU_WIDTH - 15,
        backgroundColor: colours.offwhite,
    },
    unhighlight: {
        width: 2,
        height: SIDE_MENU_WIDTH - 15,
        backgroundColor: colours.menu,
    }
}
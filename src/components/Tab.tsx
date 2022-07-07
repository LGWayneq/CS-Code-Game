import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles'
import { TAB_HEIGHT } from '../assets/constants';
import { tabsData } from '../assets/upgradesData';
import PYTHON from '../assets/icons/python.png';

interface TabProps {
    index: number,
    setCurrentTab: Function,
    isActive: boolean
}

function Tab(props: TabProps) {
    return (
        <div
            style={{ ...styles.container, backgroundColor: props.isActive ? colours.main : colours.menu }}
            onClick={() => props.setCurrentTab(props.index)}>
            <img style={styles.icon} src={tabsData[props.index].image} />
            <body style={styles.tabTitle}>{tabsData[props.index].name}</body>
        </div>
    );
}

export default Tab;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        height: TAB_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 20,
        cursor: 'pointer'
    },
    icon: {
        height: 12,
        width: 12,
        marginRight: 5
    },
    tabTitle: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        textAlign: 'center' as 'center'
    }
}
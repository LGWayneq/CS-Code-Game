import { FunctionComponent } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { ProjectsState } from '../../../utils/redux/slices/projectsSlice'
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { LinearProgress } from '@mui/material'
import { numberToFloatDisplay } from '../../../utils/MoneyManager';

interface CurrentProjectCardProps {
    projectState: ProjectsState
}

const CurrentProjectCard: FunctionComponent<CurrentProjectCardProps> = (props: CurrentProjectCardProps) => {
    return (
        <>
            {
                props.projectState.currentProject != null &&
                <div style={styles.container}>
                    <body style={styles.name}>Current Project: {props.projectState.currentProject?.name}</body>
                    <LinearProgress
                        variant="determinate"
                        sx={styles.progressBar}
                        value={100 * props.projectState.linesCompleted / props.projectState.currentProject?.requiredLines} />
                    <body style={{ ...styles.label, ...styles.flexRow }}>
                        {/* may have some bug. need to monitor */}
                        <body style={{ marginRight: 5 }}>Lines Completed:</body>
                        {numberToFloatDisplay(props.projectState.linesCompleted)}
                        /
                        {numberToFloatDisplay(props.projectState.currentProject?.requiredLines)}
                    </body>
                    <body style={props.projectState.timeRemaining >= 0 ? styles.label : styles.labelAlert}>
                        Time Remaining: {props.projectState.timeRemaining >= 0 ? props.projectState.timeRemaining : 0}s
                    </body>
                </div >
            }
        </>
    );
}

export default CurrentProjectCard;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        justifyContent: 'space-between' as 'space-between',
        marginTop: 20,
    },
    progressBar: {
        borderRadius: 10
    },
    name: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 10
    },
    label: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginRight: 5,
        marginTop: 10,
        alignSelf: 'flex-end' as 'flex-end'
    },
    labelAlert: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        color: colours.alert,
        marginRight: 5,
        marginTop: 10,
        alignSelf: 'flex-end' as 'flex-end'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'flex-end' as 'flex-end'
    }
}
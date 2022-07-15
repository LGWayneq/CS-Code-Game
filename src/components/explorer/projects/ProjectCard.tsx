import { FunctionComponent } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { getFloatDisplay } from '../../../utils/MoneyManager';
import { Project } from '../../../assets/projectsData';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import BuyButton from '../../ui/BuyButton';

interface ProjectCardProps {
    index: number
    project: Project
    disabled?: boolean
    startProject: Function
}

const ProjectCard: FunctionComponent<ProjectCardProps> = (props: ProjectCardProps) => {
    return (
        <div style={styles.container}>
            {props.project.icon}
            <div>
                <body style={styles.name}>{props.project.name}</body>
                <body style={styles.description}>{props.project.description}</body>
                <div style={styles.subContainer}>
                    <div>
                        <div style={styles.detailsContainer}>
                            <body style={styles.label}>
                                Lines Required: {props.project.requiredLines}
                            </body>
                        </div>
                        <div style={styles.detailsContainer}>
                            <body style={styles.label}>
                                Payout:
                            </body>
                            {getFloatDisplay(props.project.payout)}
                        </div>
                        <div style={styles.detailsContainer}>
                            <body style={styles.label}>
                                Penalty:
                            </body>
                            {getFloatDisplay(props.project.penalty)}
                            <body style={styles.label}>/s</body>
                        </div>
                    </div>
                    <BuyButton
                        style={{ marginLeft: 'auto', marginTop: 'auto' }}
                        disabled={props.disabled}
                        onClick={() => props.startProject(props.project)}>
                        Start
                    </BuyButton>
                </div>
            </div>
        </div >
    );
}

ProjectCard.defaultProps = {
    disabled: false
}

export default ProjectCard;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        width: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        justifyContent: 'space-between' as 'space-between',
        marginTop: 30,
    },
    subContainer: {
        display: 'flex',
        width: EXPLORER_WIDTH - 108,
        flexDirection: 'row' as 'row',
        alignItems: 'center'
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'flex-end' as 'flex-end',
        marginTop: 3
    },
    name: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 5
    },
    description: {
        ...textStyles.terminalLabel,
        color: 'rgba(133,133,133,1)',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5
    },
    label: {
        ...textStyles.terminalLabel,
        fontSize: 14,
        marginRight: 5,
        alignSelf: 'flex-end' as 'flex-end'
    },
}
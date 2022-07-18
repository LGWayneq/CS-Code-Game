import { Project, projectsData } from '../../../assets/projectsData';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { useAppSelector } from '../../../utils/redux/hooks';
import ProjectCard from './ProjectCard';
import CurrentProjectCard from './CurrentProjectCard';
import { ableToPurchase, multiply } from '../../../utils/MoneyManager';

interface ProjectsExplorerProps {
    handleStartProject: Function
}

function ProjectsExplorer(props: ProjectsExplorerProps) {
    const lifetimeMoney = useAppSelector(state => state.money.lifetime)
    const projectState = useAppSelector(state => state.projects)

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>PROJECTS</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Take up projects to earn more money!</p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Each project will require you to finish a set number of lines of code within 30 seconds. </p>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Your money will be deducted for each second that is exceeded, so be careful when choosing your projects!</p>
            <CurrentProjectCard projectState={projectState} />
            {projectsData.map((project, index) => {
                if (ableToPurchase(lifetimeMoney, multiply(project.payout, 2)))
                    return (
                        <ProjectCard
                            key={index}
                            index={index}
                            disabled={projectState.currentProject != null}
                            startProject={(project: Project) => props.handleStartProject(project)}
                            project={project} />
                    )
            })}
        </div>
    );
}

export default ProjectsExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 50,
        backgroundColor: colours.explorer,
        paddingBottom: 20
    },
    qtyContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between'
    },
    qtyLabel: {
        ...textStyles.terminalLabel,
    },
    qty: {
        ...textStyles.terminalLabel,
        fontWeight: 700,
        cursor: 'pointer'
    }
}
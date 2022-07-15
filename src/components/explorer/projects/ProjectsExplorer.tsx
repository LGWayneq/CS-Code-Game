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
    const projectState = useAppSelector(state => state.projects)

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>PROJECTS</p>
            <CurrentProjectCard projectState={projectState} />
            {projectsData.map((project, index) => {
                // if (ableToPurchase(lifetimeMoney, multiply(project.payout, 2)))
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
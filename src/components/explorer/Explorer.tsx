import React, { useState } from 'react';
import { colours } from '../../assets/colours';
import { textStyles } from '../../assets/textStyles';
import { EXPLORER_WIDTH, TITLE_BAR_HEIGHT } from '../../assets/constants';
import HiringExplorer from './hiring/HiringExplorer';
import StandardExplorer from './keyboard/StandardExplorer';
import getWindowDimensions from '../../utils/WindowDimensions';
import ProjectsExplorer from './projects/ProjectsExplorer';
import EnddayExplorer from './endday/EnddayExplorer';
import SettingsExplorer from './settings/SettingsExplorer';

export enum ExplorerStates {
    HIRING,
    STANDARD,
    PROJECTS,
    ENDDAY,
    SETTINGS
}

interface ExplorerProps {
    explorerState: ExplorerStates
}

function Explorer(props: ExplorerProps) {
    return (
        <div style={{ ...styles.container, height: getWindowDimensions().height - TITLE_BAR_HEIGHT }}>
            <div style={{ ...styles.scrollBarHide, height: getWindowDimensions().height - TITLE_BAR_HEIGHT }} />
            {
                props.explorerState == ExplorerStates.HIRING &&
                <HiringExplorer />
            }
            {
                props.explorerState == ExplorerStates.STANDARD &&
                <StandardExplorer />
            }
            {
                props.explorerState == ExplorerStates.PROJECTS &&
                <ProjectsExplorer />
            }
            {
                props.explorerState == ExplorerStates.ENDDAY &&
                <EnddayExplorer />
            }
            {
                props.explorerState == ExplorerStates.SETTINGS &&
                <SettingsExplorer />
            }
        </div>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH,
        backgroundColor: colours.explorer,
        overflowY: 'scroll' as 'scroll',
        paddingLeft: 20,
        // paddingRight: 20,
    },
    scrollBarHide: {
        position: 'absolute' as 'absolute',
        width: 20,
        backgroundColor: colours.explorer,
        alignSelf: 'flex-start' as 'flex-start',
        marginLeft: EXPLORER_WIDTH - 38
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
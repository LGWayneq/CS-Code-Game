import React, { useState } from 'react';
import { colours } from '../../assets/colours';
import { textStyles } from '../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../assets/constants';
import HiringExplorer from './hiring/HiringExplorer';
import KeyboardExplorer from './keyboard/KeyboardExplorer';

export enum ExplorerStates {
    HIRING,
    KEYBOARD,
    TABS
}

interface ExplorerProps {
    explorerState: ExplorerStates
}

function Explorer(props: ExplorerProps) {
    return (
        <>
            {
                props.explorerState == ExplorerStates.HIRING &&
                <HiringExplorer />
            }
            {
                props.explorerState == ExplorerStates.KEYBOARD &&
                <KeyboardExplorer />
            }
        </>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        paddingLeft: 20,
        paddingRight: 20
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
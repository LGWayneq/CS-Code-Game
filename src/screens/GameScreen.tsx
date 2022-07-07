import React, { useState } from 'react';
import { colours } from '../assets/colours';
import TitleBar from '../components/TitleBar';
import SideMenu from '../components/explorer/SideMenu';
import Explorer from '../components/explorer/Explorer';
import TabsNavigator from '../components/TabsNavigator';
import CodingArea from '../components/CodingArea';
import Terminal from '../components/Terminal';
import { ExplorerStates } from '../components/explorer/Explorer'
import { useAppSelector } from '../utils/redux/hooks';

function GameScreen() {
    const tabs = useAppSelector(state => state.tabs.value)
    const [explorerState, setExplorerState] = useState<ExplorerStates>(ExplorerStates.HIRING)

    return (
        <div style={styles.container}>
            <TitleBar />
            <div style={styles.subContainer}>
                <SideMenu setExplorerState={(value: ExplorerStates) => setExplorerState(value)} />
                <Explorer explorerState={explorerState}/>
                <div>
                    <TabsNavigator tabs={tabs}/>
                    <CodingArea />
                    <Terminal />
                </div>
            </div>
        </div>
    );
}

export default GameScreen;

const styles = {
    container: {
        backgroundColor: colours.main,
        height: '100vh',
        width: '100vw'
    },
    subContainer: {
        display: 'flex',
        width: '100vw',
        flexDirection: 'row' as 'row'
    },
}
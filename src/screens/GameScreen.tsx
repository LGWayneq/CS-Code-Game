import { useState, useEffect } from 'react';
import { colours } from '../assets/colours';
import TitleBar from '../components/TitleBar';
import Explorer from '../components/explorer/Explorer';
import TabsNavigator from '../components/TabsNavigator';
import CodingArea from '../components/CodingArea';
import Terminal from '../components/Terminal';
import { useAppSelector } from './../utils/redux/hooks';
import ResumeModal from '../components/ResumeModal';

function GameScreen() {
    const tabs = useAppSelector(state => state.tabs.value)
    const [overlay, setOverlay] = useState<JSX.Element>(<></>)
    const [currentTab, setCurrentTab] = useState<number>(0)

    useEffect(() => {
        setOverlay(<ResumeModal setOverlay={(overlay: JSX.Element) => setOverlay(overlay)}/>)
    }, [])

    return (
        <div style={styles.container}>
            {overlay}
            <TitleBar />
            <div style={styles.subContainer}>
                <Explorer
                    setOverlay={(overlay: JSX.Element) => setOverlay(overlay)} />
                <div>
                    <TabsNavigator
                        tabs={tabs}
                        currentTab={currentTab}
                        setCurrentTab={(value: number) => setCurrentTab(value)} />
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
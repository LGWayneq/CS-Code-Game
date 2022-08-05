import { useState, useEffect } from 'react';
import { colours } from '../assets/colours';
import TitleBar from '../components/TitleBar';
import Explorer from '../components/explorer/Explorer';
import TabsNavigator from '../components/TabsNavigator';
import CodingArea from '../components/CodingArea';
import Terminal from '../components/Terminal';
import { useAppDispatch, useAppSelector } from './../utils/redux/hooks';
import { setLastFocused } from './../utils/redux/slices/sessionSlice';
import { calculateTimeElapsed } from '../utils/DateTime';

function GameScreen() {
    const tabs = useAppSelector(state => state.tabs.value)
    const [modal, setOverlay] = useState<JSX.Element>(<></>)
    const [currentTab, setCurrentTab] = useState<number>(0)
    const lastFocused = useAppSelector(state => state.session.lastFocused)
    const cps = useAppSelector(state => state.cps.value)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      window.addEventListener("focus", onFocus);
      window.addEventListener("blur", onBlur);
      window.addEventListener('beforeunload', onBlur);
      onFocus();
      return () => {
        window.removeEventListener("focus", onFocus);
        window.removeEventListener("blur", onBlur);
        window.removeEventListener("beforeunload", onBlur);
      };
    }, []);
  
    const onFocus = () => {
        const timeElapsed = calculateTimeElapsed(new Date(lastFocused))
        const charIncrement = timeElapsed * cps
    };
  
    const onBlur = () => {
      dispatch(setLastFocused(new Date()))
    };

    return (
        <div style={styles.container}>
            {modal}
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
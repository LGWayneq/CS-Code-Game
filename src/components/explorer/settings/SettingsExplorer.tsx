import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../utils/redux/hooks';
import { resetCodingArea } from '../../../utils/redux/slices/codingAreaSlice';
import { resetCpk } from '../../../utils/redux/slices/cpkSlice';
import { resetCps } from '../../../utils/redux/slices/cpsSlice';
import { restartDay } from '../../../utils/redux/slices/dayStartSlice';
import { hardResetMoney } from '../../../utils/redux/slices/moneySlice';
import { resetMpl } from '../../../utils/redux/slices/mplSlice';
import { resetTabs } from '../../../utils/redux/slices/tabsSlice';
import { resetUpgrades } from '../../../utils/redux/slices/upgradesSlice';
import { resetProject } from '../../../utils/redux/slices/projectsSlice';
import { setVolume } from '../../../utils/redux/slices/settingsSlice';
import BuyButton from '../../ui/BuyButton';


function SettingsExplorer() {
    const settingsState = useAppSelector(state => state.settings)
    const dispatch = useAppDispatch()

    const resetGame = () => {
        dispatch(resetCodingArea())
        dispatch(resetCpk())
        dispatch(resetCps())
        dispatch(restartDay())
        dispatch(hardResetMoney())
        dispatch(resetMpl())
        dispatch(resetTabs())
        dispatch(resetUpgrades())
        dispatch(resetProject())
    }

    const handleVolumeChange = (volume: number) => {
        dispatch(setVolume(volume))
    }

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>SETTINGS</p>
            <div style={styles.itemContainer}>
                <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>Volume</p>
                <Slider
                    style={styles.slider}
                    size="small"
                    value={settingsState.volume}
                    onChange={(event: Event, newValue: number | number[]) => { if (typeof newValue == "number") handleVolumeChange(newValue) }} />
                <input
                    style={styles.input}
                    value={settingsState.volume}
                    onChange={(event) => handleVolumeChange(parseInt(event.target.value))} />
            </div>
            <BuyButton
                style={styles.button}
                onClick={() => resetGame()}>
                Reset Game
            </BuyButton>
        </div>
    );
}

export default SettingsExplorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 50,
        backgroundColor: colours.explorer,
        paddingBottom: 20
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItem: 'center',
        marginBottom: 10
    },
    slider: {
        color: colours.cursor,
        width: EXPLORER_WIDTH - 170,
        alignSelf: 'center',
    },
    input: {
        ...textStyles.terminalLabel,
        backgroundColor: colours.menu,
        borderWidth: 0,
        borderRadius: 5,
        width: 30,
        height: 25,
        textAlign: 'center' as 'center',
        alignSelf: 'center'
    },
    button: {
        height: 28,
        paddingTop: 8,
    }
}
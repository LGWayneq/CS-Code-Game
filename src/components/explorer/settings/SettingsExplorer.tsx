import React, { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import { EXPLORER_WIDTH } from '../../../assets/constants';
import { resetCodingArea } from '../../../utils/redux/slices/codingAreaSlice';
import { useAppDispatch } from '../../../utils/redux/hooks';
import { resetCpk } from '../../../utils/redux/slices/cpkSlice';
import { resetCps } from '../../../utils/redux/slices/cpsSlice';
import { restartDay } from '../../../utils/redux/slices/dayStartSlice';
import { hardResetMoney } from '../../../utils/redux/slices/moneySlice';
import { resetMpl } from '../../../utils/redux/slices/mplSlice';
import { resetTabs } from '../../../utils/redux/slices/tabsSlice';
import { resetUpgrades } from '../../../utils/redux/slices/upgradesSlice';
import BuyButton from '../../ui/BuyButton';
import { resetProject } from '../../../utils/redux/slices/projectsSlice';


function SettingsExplorer() {
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

    return (
        <div style={{ ...styles.container }}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>SETTINGS</p>
            <BuyButton
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
    },
}
import React from 'react';
import { colours } from '../assets/colours';
import { textStyles } from '../assets/textStyles';
import { EXPLORER_WIDTH } from '../assets/constants';
import { upgradesData } from '../assets/upgradesData';
import { useAppDispatch } from '../utils/redux/hooks';
import HiringCard from './HiringCard';

function Explorer() {
    return (
        <div style={styles.container}>
            <p style={{ ...textStyles.terminalLabel, fontSize: 14 }}>HIRING</p>
            {upgradesData.hiring.map((upgrade, index) => {
                return (
                    <HiringCard key={index} upgrade={upgrade}/>

                )
            })}
        </div>
    );
}

export default Explorer;

const styles = {
    container: {
        width: EXPLORER_WIDTH - 40,
        backgroundColor: colours.explorer,
        paddingLeft: 20,
        paddingRight: 20
    }
}
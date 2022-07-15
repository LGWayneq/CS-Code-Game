import { useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';
import WindowDimensions from '../../../utils/WindowDimensions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DropdownItem from './DropdownItem';

interface DropdownProps {
    value: string
    options: Array<string>
    onChange: Function
}

function Dropdown(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleSelection = (value: string) => {
        setIsOpen(false)
        props.onChange(value)
    }

    return (
        <div style={styles.container}>
            <div
                style={styles.selectedDisplay}
                onClick={() => setIsOpen(!isOpen)}>
                <body style={styles.text}>{props.value}</body>
                <ExpandMoreIcon sx={styles.arrow} />
            </div>
            {isOpen &&
                <div style={styles.listContainer}>
                    {props.options.map((option, index) => {
                        return (
                            <DropdownItem
                                key={index}
                                active={props.value == option}
                                onClick={() => handleSelection(option)}>
                                {option}
                            </DropdownItem>
                        )
                    })}
                </div>
            }
        </div>
    );
}

export default Dropdown;

const styles = {
    container: {
        borderRadius: 5,
        width: 480
    },
    selectedDisplay: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center',
        backgroundColor: colours.explorer,
        borderRadius: 5,
        height: 40,
        width: 480,
        paddingLeft: 10,
        paddingRight: 10,
        cursor: 'pointer'
    },
    text: {
        ...textStyles.terminalLabel
    },
    arrow: {
        color: colours.offwhite,
    },
    listContainer: {
        position: 'absolute' as 'absolute',
        backgroundColor: colours.explorer,
        borderRadius: 5,
        width: 500,
    }
}
import { useEffect, useState } from 'react';
import { colours } from '../../../assets/colours';
import { textStyles } from '../../../assets/textStyles';

interface DropdownProps {
    children: string
    active: boolean
    onClick: Function
}

function DropdownItem(props: DropdownProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [containerStyle, setContainerStyle] = useState<any>({})

    useEffect(() => {
        if (isHovered) {
            setContainerStyle({ ...styles.container, ...styles.hovered })
        } else if (props.active) {
            setContainerStyle({ ...styles.container, ...styles.active })
        } else {
            setContainerStyle(styles.container)
        }
    }, [props.active, isHovered])

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => props.onClick()}>
            <body style={styles.text}>{props.children}</body>
        </div>
    );
}

export default DropdownItem;

const styles = {
    container: {
        display: 'flex',
        width: 480,
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        cursor: 'pointer'
    },
    active: {
        backgroundColor: colours.main,
    },
    hovered: {
        backgroundColor: colours.divider
    },
    text: {
        ...textStyles.terminalLabel
    }
}
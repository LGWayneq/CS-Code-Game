import { FunctionComponent, useEffect, useState } from 'react';
import { colours } from '../../assets/colours';
import { textStyles } from '../../assets/textStyles'

interface BuyButtonProps {
    disabled?: boolean
    children: string
    onClick: Function
    style?: Object
}

const BuyButton: FunctionComponent<BuyButtonProps> = (props: BuyButtonProps) => {
    const [style, setStyle] = useState<Object>(styles.container)

    useEffect(() => {
        setStyle(getStyles(props.disabled, props.style))
    }, [props.disabled])

    const handleClick = () => {
        if (!props.disabled) {
            props.onClick()
        }
    }

    const handleMouseDown = () => {
        const newStyle = { ...style, ...styles.mouseDown }
        setStyle(newStyle)
    }

    const handleMouseUp = () => {
        setStyle(getStyles(props.disabled, props.style))
    }

    const getStyles = (disabled?: boolean, style?: Object): Object => {
        if (disabled) {
            return { ...styles.containerDisabled, ...style } as Object
        } else {
            return { ...styles.container, ...style } as Object
        }
    }

    return (
        <div
            style={style}
            onMouseDown={() => handleMouseDown()}
            onMouseUp={() => handleMouseUp()}
            onClick={() => handleClick()}>
            {props.children}
        </div>
    );
}

BuyButton.defaultProps = {
    disabled: false
}

export default BuyButton;

const baseStyle = {
    ...textStyles.terminalLabel,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    userSelect: 'none',
    textAlign: 'center',
}

const styles = {
    container: {
        ...baseStyle,
        border: '1px grey solid',
        cursor: 'pointer'
    },
    containerDisabled: {
        ...baseStyle,
        color: colours.divider,
        border: `1px ${colours.divider} solid`,
        cursor: 'default'
    },
    mouseDown: {
        ...baseStyle,
        color: colours.divider,
        border: `1px ${colours.divider} solid`,
        cursor: 'pointer'
    }
}
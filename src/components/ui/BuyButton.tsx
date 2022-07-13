import { FunctionComponent } from 'react';
import { colours } from '../../assets/colours';
import { textStyles } from '../../assets/textStyles'

interface BuyButtonProps {
    disabled?: boolean
    children: string
    onClick: Function
    style?: Object
}

const BuyButton: FunctionComponent<BuyButtonProps> = (props: BuyButtonProps) => {

    const handleClick = () => {
        if (!props.disabled) {
            props.onClick()
        }
    }

    const getStyles = (disabled?: boolean, style?: Object) => {
        if (disabled) {
            return { ...styles.containerDisabled, ...style }
        } else {
            return { ...styles.container, ...style }
        }
    }

    return (
        <div
            style={getStyles(props.disabled, props.style)}
            onClick={() => handleClick()}>
            {props.children}
        </div>
    );
}

BuyButton.defaultProps = {
    disabled: false
}

export default BuyButton;

const styles = {
    container: {
        ...textStyles.terminalLabel,
        border: '1px grey solid',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        cursor: 'pointer'
    },
    containerDisabled: {
        ...textStyles.terminalLabel,
        color: colours.divider,
        border: `1px ${colours.divider} solid`,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        cursor: 'default'
    }
}
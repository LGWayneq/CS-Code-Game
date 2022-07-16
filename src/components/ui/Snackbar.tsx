import { useEffect, useState, useRef } from 'react'
import { colours } from '../../assets/colours'
import { textStyles } from '../../assets/textStyles'
import WindowDimensions from '../../utils/WindowDimensions'

interface SnackbarProps {
    children: string
}

const MARGIN_BOTTOM = 20
const PADDING_VERTICAL = 10
const PADDING_HORIZONTAL = 20

function Snackbar(props: SnackbarProps) {
    const ref = useRef<any>()
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [height, setHeight] = useState<number>(0)
    const [width, setWidth] = useState<number>(0)

    useEffect(() => {
        if (ref.current != null) {
            setHeight(ref.current.clientHeight)
            setWidth(ref.current.clientWidth)
        }

        const removeSnackbarTimeout = setTimeout(() => removeSnackbar(), 5000)

        return () => {
            clearTimeout(removeSnackbarTimeout)
            setIsVisible(true)
        }
    }, [])

    const removeSnackbar = () => {
        setIsVisible(false)
    }

    const getPadding = (isVisible: boolean) => {
        if (isVisible) {
            return {
                paddingTop: PADDING_VERTICAL,
                paddingBottom: PADDING_VERTICAL,
                paddingLeft: PADDING_HORIZONTAL,
                paddingRight: PADDING_HORIZONTAL,
            }
        } else {
            return { padding: 0 }
        }
    }

    return (
        <div
            ref={ref}
            style={{
                ...styles.container,
                marginTop: WindowDimensions().height - height - MARGIN_BOTTOM,
                marginLeft: (WindowDimensions().width - width) / 2,
                ...getPadding(isVisible)
            }}>
            {isVisible && props.children}
        </div>
    );
}

export default Snackbar;

const styles = {
    container: {
        ...textStyles.terminalLabel,
        display: 'flex',
        position: 'absolute' as 'absolute',
        backgroundColor: colours.menu,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    },
}
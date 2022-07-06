import { textStyles } from "../assets/textStyles"

export interface Money {
    base: number,
    exponent: number
}

const getMoneyDisplay = (money: Money): JSX.Element => {
    if (money.exponent < 10) {
        return (
            <body style={{ ...textStyles.terminalLabel, fontSize: 14 }}>
                ${money.base * Math.pow(2, money.exponent)}
            </body>
        )
    }
    else {
        return (
            <body style={{ ...textStyles.terminalLabel, fontSize: 14 }}>
                ${money.base.toFixed(2)} x2<sup>{money.exponent}</sup>
            </body>
        )
    }
}

const ableToPurchase = (money: Money, cost: Money): boolean => {
    if (money.exponent < cost.exponent) {
        return false
    } else if (money.exponent == cost.exponent && money.base < cost.base) {
        return false
    } else {
        return true
    }
}

export { getMoneyDisplay, ableToPurchase }
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

const sumOf = (left: Money, right: Money): Money => {
    //determine smaller number
    const smallerBigger = getSmallerBigger(left, right)
    var smaller = smallerBigger.smaller
    var bigger = smallerBigger.bigger
    //rewrite smaller number such that exponent matches larger number
    const exponentGap = bigger.exponent - smaller.exponent
    smaller.base = smaller.base / Math.pow(2, exponentGap)
    smaller.exponent = bigger.exponent
    //add mantisas (base)
    var result: Money = { base: smaller.base + bigger.base, exponent: bigger.exponent }
    //normalise result
    while (result.base > 2) {
        result.base = result.base / 2
        result.exponent += 1
    }
    while (result.base < 1) {
        result.base = result.base * 2
        result.exponent -= 1
    }
    //round result (currently not done)
    return result
}

const subtract = (left: Money, right: Money): Money => {
    //assume that left > right is always true
    var result: Money = sumOf(left, { base: -right.base, exponent: right.exponent })
    return result
}

const getSmallerBigger = (left: Money, right: Money) => {
    var smaller: Money = { base: 0, exponent: 0 }
    var bigger: Money = { base: 0, exponent: 0 }
    if (left.exponent < right.exponent) {
        smaller = left
        bigger = right
    } else if (left.exponent > right.exponent) {
        smaller = right
        bigger = left
    } else if (left.base < right.base) {
        smaller = left
        bigger = right
    } else {
        smaller = right
        bigger = left
    }
    return { smaller: smaller, bigger: bigger }
}

export { getMoneyDisplay, ableToPurchase, sumOf, subtract }
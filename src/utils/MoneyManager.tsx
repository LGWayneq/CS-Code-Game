import { textStyles } from "../assets/textStyles"

//todo (low priority): refactor FloatingPoint to class
export interface FloatingPoint {
    base: number,
    exponent: number
}

const numberToFloatDisplay = (value: number): JSX.Element => {
    const exponent: number = Math.floor(Math.log(value) / Math.log(2))
    const base: number = value / Math.pow(2, exponent)
    console.log({ base: base, exponent: exponent })
    return getFloatDisplay({ base: base, exponent: exponent }, false, "")
}

const getFloatDisplay = (float: FloatingPoint, isCost: boolean = true, prefix: string = "$"): JSX.Element => {
    if (float.exponent < 10) {
        return (
            <body style={styles.moneyText}>
                {isCost ?
                    `${prefix}${Math.ceil((float.base * Math.pow(2, float.exponent)))}` :
                    `${prefix}${Math.floor(float.base * Math.pow(2, float.exponent))}`
                }
            </body>
        )
    }
    else {
        return (
            <body style={styles.moneyText}>
                {`${prefix}${float.base.toFixed(2)}`} x2<sup>{float.exponent}</sup>
            </body>
        )
    }
}

const ableToPurchase = (money: FloatingPoint, cost: FloatingPoint): boolean => {
    if (money.exponent < cost.exponent) {
        return false
    } else if (money.exponent == cost.exponent && money.base < cost.base) {
        return false
    } else {
        return true
    }
}

const sumOf = (left: FloatingPoint, right: FloatingPoint): FloatingPoint => {
    //determine smaller number
    const smallerBigger = getSmallerBigger(left, right)
    var smaller = smallerBigger.smaller
    var bigger = smallerBigger.bigger
    //rewrite smaller number such that exponent matches larger number
    const exponentGap = bigger.exponent - smaller.exponent
    smaller.base = smaller.base / Math.pow(2, exponentGap)
    smaller.exponent = bigger.exponent
    //add mantisas (base)
    var result: FloatingPoint = { base: smaller.base + bigger.base, exponent: bigger.exponent }
    //normalise result
    if (result.base != 0) {
        while (result.base > 2) {
            result.base = result.base / 2
            result.exponent += 1
        }
        while (result.base < 1) {
            result.base = result.base * 2
            result.exponent -= 1
        }
    }
    //round result (currently rounded to 5dp)
    result.base = parseFloat(result.base.toFixed(5))
    return result
}

const subtract = (left: FloatingPoint, right: FloatingPoint): FloatingPoint => {
    //assume that left > right is always true
    var result: FloatingPoint = sumOf(left, { base: -right.base, exponent: right.exponent })
    return result
}

const multiply = (left: FloatingPoint, right: (FloatingPoint | number)): FloatingPoint => {
    const floatRight: FloatingPoint = (typeof right == "number") ?
        { base: right, exponent: 0 } :
        right
    var newBase = left.base * floatRight.base
    var newExponent = left.exponent + floatRight.exponent
    if (newBase != 0) {
        while (newBase > 2) {
            newBase = newBase / 2
            newExponent += 1
        }
        while (newBase < 1) {
            newBase = newBase * 2
            newExponent -= 1
        }
    }
    return { base: newBase, exponent: newExponent }
}

const divide = (left: FloatingPoint, right: (FloatingPoint | number)) => {
    if (typeof right == "number") return multiply(left, 1 / right)
    else return multiply(left, { base: 1 / right.base, exponent: -right.exponent })
}

const getSmallerBigger = (left: FloatingPoint, right: FloatingPoint) => {
    var smaller: FloatingPoint = { base: 0, exponent: 0 }
    var bigger: FloatingPoint = { base: 0, exponent: 0 }
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

export { numberToFloatDisplay, getFloatDisplay, ableToPurchase, sumOf, subtract, multiply, divide }

const styles = {
    moneyText: {
        ...textStyles.terminalLabel,
        fontSize: 14,
    }
}
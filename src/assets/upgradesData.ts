import INTERN from '../assets/icons/hiring/intern.png';
import JUNIOR from '../assets/icons/hiring/junior.png';
import FREELANCER from '../assets/icons/hiring/freelancer.png';
import INTERMEDIATE from '../assets/icons/hiring/intermediate.png';
import SENIOR from '../assets/icons/hiring/senior.png';
import STAFF from '../assets/icons/hiring/staff.png';
import HACKERMAN from '../assets/icons/hiring/hackerman.png';
import PRINCIPAL from '../assets/icons/hiring/principal.png';
import PYTHON from '../assets/icons/python.png';
import { FloatingPoint } from '../utils/MoneyManager'

export interface HiringUpgradeType {
    id: number,
    name: string,
    description: string,
    image: any,
    baseCost: FloatingPoint,
    cps: number
}

export interface StandardUpgrade {
    name: string,
    type: StandardUpgradeType,
    description: string,
    baseCost: FloatingPoint
}

export enum StandardUpgradeType {
    KEYBOARD,
    PROMOTION,
    TABS
}

export const upgradesData = {
    hiring: [
        {
            id: 0,
            name: "Intern",
            description: "Cheap labour",
            image: INTERN,
            baseCost: {
                base: 1,
                exponent: 1
            },
            cps: 0.2
        },
        {
            id: 1,
            name: "Junior",
            description: "They know a little stuff",
            image: JUNIOR,
            baseCost: {
                base: 1.5,
                exponent: 5
            },
            cps: 1
        },
        {
            id: 2,
            name: "Freelancer",
            description: "Outsource your work",
            image: FREELANCER,
            baseCost: {
                base: 1,
                exponent: 9
            },
            cps: 5
        },
        {
            id: 3,
            name: "Intermediate",
            description: "They know some stuff",
            image: INTERMEDIATE,
            baseCost: {
                base: 1,
                exponent: 13
            },
            cps: 25
        },
        {
            id: 4,
            name: "Senior",
            description: "They know their stuff",
            image: SENIOR,
            baseCost: {
                base: 1,
                exponent: 17
            },
            cps: 125
        },
        {
            id: 5,
            name: "Staff",
            description: "They know most stuff",
            image: STAFF,
            baseCost: {
                base: 1,
                exponent: 21
            },
            cps: 625
        },
        {
            id: 6,
            name: "Hackerman",
            description: "I'm in",
            image: HACKERMAN,
            baseCost: {
                base: 1,
                exponent: 25
            },
            cps: 3125
        },
        {
            id: 7,
            name: "Principal",
            description: "They know everything",
            image: PRINCIPAL,
            baseCost: {
                base: 1,
                exponent: 29
            },
            cps: 15625
        },
        {
            id: 8,
            name: "CTO",
            description: "Aren't they the ones paying you?",
            image: PRINCIPAL,   //todo
            baseCost: {
                base: 1,
                exponent: 34
            },
            cps: 78125
        },
        {
            id: 9,
            name: "Turing Machine",
            description: "Tap tap tap",
            image: PRINCIPAL,   //todo
            baseCost: {
                base: 1,
                exponent: 39
            },
            cps: 390625
        },
        {
            id: 10,
            name: "Robot Dog",
            description: "Can dogs code?",
            image: PRINCIPAL,   //todo
            baseCost: {
                base: 1,
                exponent: 44
            },
            cps: 1953125
        },
        {
            id: 10,
            name: "Deep Blue",
            description: "Checkmate",
            image: PRINCIPAL,   //todo
            baseCost: {
                base: 1,
                exponent: 49
            },
            cps: 1953125 * 5
        },
        {
            id: 11,
            name: "GLaDOS",
            description: "Cake",
            image: PRINCIPAL,   //todo
            baseCost: {
                base: 1,
                exponent: 54
            },
            cps: 1953125 * 5 * 5
        }
    ],
    standard: [
        {
            name: "Keyboard Upgrade 1",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 4
            }
        },
        {
            name: "Promotion 1",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your first promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 8
            }
        },
        {
            name: "Keyboard Upgrade 2",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 9
            }
        },
        {
            name: "Promotion 2",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your second promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 13
            }
        },
        {
            name: "Keyboard Upgrade 3",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 14
            }
        },
        {
            name: "New Tab 1",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1,
                exponent: 16
            }
        },
        {
            name: "Promotion 3",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your third promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 18
            }
        },
        {
            name: "Keyboard Upgrade 4",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 19
            }
        },
        {
            name: "Promotion 4",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your fourth promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 23
            }
        },
        {
            name: "Keyboard Upgrade 5",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 24
            }
        },
        {
            name: "New Tab 2",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1.5,
                exponent: 24
            }
        },
        {
            name: "Promotion 5",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your fifth promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 28
            }
        },
        {
            name: "Keyboard Upgrade 6",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 29
            }
        },
        {
            name: "Promotion 6",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your sixth promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 33
            }
        },
        {
            name: "New Tab 3",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1,
                exponent: 33
            }
        },
        {
            name: "Keyboard Upgrade 7",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 34
            }
        },
        {
            name: "Promotion 7",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your seventh promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 38
            }
        },
        {
            name: "Keyboard Upgrade 8",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 39
            }
        },
        {
            name: "New Tab 4",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1.5,
                exponent: 41
            }
        },
        {
            name: "Promotion 8",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your eigth promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 43
            }
        },
        {
            name: "Keyboard Upgrade 9",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 44
            }
        },
        {
            name: "Promotion 9",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your ninth promotion! Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 48
            }
        },
        {
            name: "Keyboard Upgrade 10",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 49
            }
        },
        {
            name: "New Tab 5",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1,
                exponent: 50
            }
        },
        {
            name: "Promotion 10",
            type: StandardUpgradeType.PROMOTION,
            description: "Congrats on your final promotion? Earn more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 53
            }
        },
        {
            name: "New Tab 6",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1.5,
                exponent: 58
            }
        },
    ],
}

export const tabsData = [
    {
        name: "HelloWorld.py",
        image: PYTHON
    },
    {
        name: "test.py",
        image: PYTHON
    },
    {
        name: "App.py",
        image: PYTHON
    },
    {
        name: "index.py",
        image: PYTHON
    }
]
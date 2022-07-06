import INTERN from '../assets/icons/intern.png'
import JUNIOR from '../assets/icons/junior-dev.png'
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
                base: 1.25,
                exponent: 3
            },
            cps: 0.1
        },
        {
            id: 1,
            name: "Junior Dev",
            description: "They know a little stuff",
            image: JUNIOR,
            baseCost: {
                base: 1.5625,
                exponent: 6
            },
            cps: 1
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
                exponent: 10
            }
        },
        {
            name: "New Tab 1",
            type: StandardUpgradeType.TABS,
            description: "Use more tabs to increase your efficiency",
            baseCost: {
                base: 1,
                exponent: 15
            }
        }
    ],
    //might remove keyboard and tabs
    keyboard: [...Array(50)].map((item, index) => {
        return {
            name: `Keyboard Upgrade ${index + 1}`,   //might want to add more name variations
            baseCost: {
                base: 1, exponent: index * 10 + 4
            }
        }
    }),
    tabs: [...Array(10)].map((item, index) => {
        return {
            name: `Add New Tab ${index + 1}`,   //might want to add more name variations
            baseCost: {
                base: 1, exponent: index * 10 + 10
            }
        }
    }),
}
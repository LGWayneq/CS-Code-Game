import INTERN from '../assets/icons/intern.png'
import JUNIOR from '../assets/icons/junior-dev.png'
import { Money } from '../utils/MoneyManager'

export interface HiringUpgradeType {
    id: number,
    name: string,
    description: string,
    image: any,
    baseCost: Money,
    cps: number
}

export interface BaseUpgradeType {
    name: string,
    baseCost: Money
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
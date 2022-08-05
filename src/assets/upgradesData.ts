import INTERN from '../assets/icons/hiring/intern.png';
import JUNIOR from '../assets/icons/hiring/junior.png';
import FREELANCER from '../assets/icons/hiring/freelancer.png';
import INTERMEDIATE from '../assets/icons/hiring/intermediate.png';
import SENIOR from '../assets/icons/hiring/senior.png';
import STAFF from '../assets/icons/hiring/staff.png';
import HACKERMAN from '../assets/icons/hiring/hackerman.png';
import PRINCIPAL from '../assets/icons/hiring/principal.png';
import CTO from '../assets/icons/hiring/cto.png';
import TURING from '../assets/icons/hiring/turing.png';
import DOG from '../assets/icons/hiring/robot-dog.png';
import SUPERCOMPUTER from '../assets/icons/hiring/super-computer.png';
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
    PAYRAISE,
    TABS
}

export const upgradesData = {
    hiring: [
        {
            id: 0,
            name: "Intern",
            description: "Just a baby",
            image: INTERN,
            baseCost: {
                base: 1,
                exponent: 1
            },
            cps: 0.3
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
            cps: 1.5
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
            cps: 7.5
        },
        {
            id: 3,
            name: "Intermediate",
            description: "They know some stuff",
            image: INTERMEDIATE,
            baseCost: {
                base: 1.5,
                exponent: 12
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
            cps: 100
        },
        {
            id: 5,
            name: "Staff",
            description: "They know most stuff",
            image: STAFF,
            baseCost: {
                base: 1.75,
                exponent: 20
            },
            cps: 420
        },
        {
            id: 6,
            name: "Hackerman",
            description: "I'm in",
            image: HACKERMAN,
            baseCost: {
                base: 1.75,
                exponent: 24
            },
            cps: 1600
        },
        {
            id: 7,
            name: "Principal",
            description: "They know everything",
            image: PRINCIPAL,
            baseCost: {
                base: 1.25,
                exponent: 29
            },
            cps: 8000
        },
        {
            id: 8,
            name: "CTO",
            description: "Aren't they the ones paying you?",
            image: CTO,   
            baseCost: {
                base: 1.25,
                exponent: 34
            },
            cps: 32000
        },
        {
            id: 9,
            name: "Turing Machine",
            description: "Tap tap tap",
            image: TURING,
            baseCost: {
                base: 1.5,
                exponent: 39
            },
            cps: 128000
        },
        {
            id: 10,
            name: "Robot Dog",
            description: "Can dogs code?",
            image: DOG,
            baseCost: {
                base: 1.5,
                exponent: 44
            },
            cps: 512000
        },
        {
            id: 11,
            name: "Super Computer",
            description: "01101110 01110101 01110100 01110011",
            image: SUPERCOMPUTER,
            baseCost: {
                base: 1.5,
                exponent: 49
            },
            cps: 2048000
        },
        // {
        //     id: 12,
        //     name: "GLaDOS",
        //     description: "Cake",
        //     image: PRINCIPAL,
        //     baseCost: {
        //         base: 1,
        //         exponent: 54
        //     },
        //     cps: 2048000 * 5
        // }
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
            name: "Keyboard Upgrade 2",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 6
            }
        },
        {
            name: "Pay Raise 1",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your first pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 8
            }
        },
        {
            name: "Keyboard Upgrade 3",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 9
            }
        },
        {
            name: "Pay Raise 2",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your second pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 13
            }
        },
        {
            name: "Keyboard Upgrade 4",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 11
            }
        },
        {
            name: "Keyboard Upgrade 5",
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
            name: "Keyboard Upgrade 6",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 16
            }
        },
        {
            name: "Pay Raise 3",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your third pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 18
            }
        },
        {
            name: "Keyboard Upgrade 7",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 19
            }
        },
        {
            name: "Keyboard Upgrade 8",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 21
            }
        },
        {
            name: "Pay Raise 4",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your fourth pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 23
            }
        },
        {
            name: "Keyboard Upgrade 9",
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
            name: "Keyboard Upgrade 10",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 26
            }
        },
        {
            name: "Pay Raise 5",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your fifth pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 28
            }
        },
        {
            name: "Keyboard Upgrade 11",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 29
            }
        },
        {
            name: "Keyboard Upgrade 12",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 31
            }
        },
        {
            name: "Pay Raise 6",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your sixth pay raise! Earn 10% more money per line of code!",
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
            name: "Keyboard Upgrade 13",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 34
            }
        },
        {
            name: "Keyboard Upgrade 14",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 36
            }
        },
        {
            name: "Pay Raise 7",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your seventh pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 38
            }
        },
        {
            name: "Keyboard Upgrade 15",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 39
            }
        },{
            name: "Keyboard Upgrade 16",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 41
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
            name: "Pay Raise 8",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your eigth pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 43
            }
        },
        {
            name: "Keyboard Upgrade 17",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 44
            }
        },
        {
            name: "Keyboard Upgrade 18",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 46
            }
        },
        {
            name: "Pay Raise 9",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your ninth pay raise! Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 48
            }
        },
        {
            name: "Keyboard Upgrade 19",
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
            name: "Keyboard Upgrade 20",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1.5,
                exponent: 51
            }
        },
        {
            name: "Pay Raise 10",
            type: StandardUpgradeType.PAYRAISE,
            description: "Congrats on your final pay raise? Earn 10% more money per line of code!",
            baseCost: {
                base: 1,
                exponent: 53
            }
        },
        {
            name: "Keyboard Upgrade 21",
            type: StandardUpgradeType.KEYBOARD,
            description: "Pay money to make your keyboard more efficient",
            baseCost: {
                base: 1,
                exponent: 54
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
    },
    {
        name: "utils.py",
        image: PYTHON
    },
    {
        name: "services.py",
        image: PYTHON
    }
]
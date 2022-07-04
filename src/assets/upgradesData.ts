import INTERN from '../assets/icons/intern.png'
import JUNIOR from '../assets/icons/junior-dev.png'

export interface UpgradeType {
    id: number,
    name: string,
    description: string,
    image: any,
    baseCost: number,
    cpms: number
}

export const upgradesData = {
    hiring: [
        {
            id: 0,
            name: "Intern",
            description: "Cheap labour",
            image: INTERN,
            baseCost: 10,
            cpms: 0.1
        },
        {
            id: 1,
            name: "Junior Dev",
            description: "They know a little stuff",
            image: JUNIOR,
            baseCost: 100,
            cpms: 1
        }
    ],
    keyboard: [

    ],
    tabs: [

    ]
}
export interface UpgradeType {
    name: string,
    description: string,
    baseCost: number,
    cpms: number
}

export const upgradesData = {
    hiring: [
        {
            name: "Interns",
            description: "Cheap labour",
            baseCost: 10,
            cpms: 0.1
        }
    ],
    keyboard: [

    ],
    tabs: [
        
    ]
}
import { FloatingPoint } from "../utils/MoneyManager"
import { colours } from "./colours";
import ListIcon from '@mui/icons-material/List';
import TelegramIcon from '@mui/icons-material/Telegram';

export interface Project {
    name: string
    description: string
    icon: any
    requiredLines: number
    payout: FloatingPoint
    penalty: FloatingPoint
}

const iconStyle = {
    color: colours.offwhite,
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginRight: 2
}

export const projectsData = [
    {
        name: "To Do List",
        description: `1. Do To Do List\n2. Earn money`,
        icon: <ListIcon sx={iconStyle} />,
        requiredLines: 10,
        payout: { base: 1.25, exponent: 3 },
        penalty: { base: 1, exponent: 0 }
    },
    {
        name: "Telegram Bot",
        description: "A simple chat bot",
        icon: <TelegramIcon sx={iconStyle} />,
        requiredLines: 50,
        payout: { base: 1.875, exponent: 5 },
        penalty: { base: 1.5, exponent: 2 }
    },
]
import { FloatingPoint } from "../utils/MoneyManager"
import { colours } from "./colours";
import ListIcon from '@mui/icons-material/List';
import TelegramIcon from '@mui/icons-material/Telegram';
import AndroidIcon from '@mui/icons-material/Android';
import BugReportIcon from '@mui/icons-material/BugReport';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WorkIcon from '@mui/icons-material/Work';
import MouseIcon from '@mui/icons-material/Mouse';
import FacebookIcon from '@mui/icons-material/Facebook';

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
        description: `1. Do To Do List`,
        icon: <ListIcon sx={iconStyle} />,
        requiredLines: 10,
        payout: { base: 1.8, exponent: 3 },
        penalty: { base: 1, exponent: 0 }
    },
    {
        name: "Telegram Bot",
        description: "A simple chat bot",
        icon: <TelegramIcon sx={iconStyle} />,
        requiredLines: 100,
        payout: { base: 1.464, exponent: 9 },
        penalty: { base: 1.5, exponent: 5 }
    },
    {
        name: "Android App",
        description: "To Do List but mobile",
        icon: <AndroidIcon sx={iconStyle} />,
        requiredLines: 1000,
        payout: { base: 1.5, exponent: 13 },
        penalty: { base: 1, exponent: 10 }
    },
    {
        name: "Bug Tracker Web App",
        description: "Splat",
        icon: <BugReportIcon sx={iconStyle} />,
        requiredLines: 25000,
        payout: { base: 1, exponent: 19 },
        penalty: { base: 1.5, exponent: 15 }
    },
    {
        name: "E-commerce Website",
        description: "Add to Cart",
        icon: <ShoppingCartIcon sx={iconStyle} />,
        requiredLines: 600000,
        payout: { base: 1.25, exponent: 24 },
        penalty: { base: 1.75, exponent: 20 }
    },
    {
        name: "Job Matching App",
        description: "Get a Job",
        icon: <WorkIcon sx={iconStyle} />,
        requiredLines: 18000000,
        payout: { base: 1.5, exponent: 29 },
        penalty: { base: 1.5, exponent: 26 }
    },
    {
        name: "Clicker Game",
        description: "Click Click",
        icon: <MouseIcon sx={iconStyle} />,
        requiredLines: 500000000,
        payout: { base: 1.5, exponent: 36 },
        penalty: { base: 1.5, exponent: 33 }
    },
    {
        name: "Facebook",
        description: "Poke",
        icon: <FacebookIcon sx={iconStyle} />,
        requiredLines: 10000000000,
        payout: { base: 1, exponent: 43 },
        penalty: { base: 1, exponent: 40 }
    },
]
// return value is in seconds
const calculateTimeElapsed = (dayStart: Date): number => {
    return (new Date().getTime() - dayStart.getTime()) / 1000
}

export { calculateTimeElapsed }
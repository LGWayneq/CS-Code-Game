// return value is in seconds
const calculateTimeElapsed = (dayStart: Date): number => {
    return (new Date().getTime() - dayStart.getTime()) / 1000
}

const calculateTimeElapsedMillisecond = (prev: Date): number => {
    const now = (new Date())
    return now.getTime() - prev.getTime()
}

export { calculateTimeElapsed, calculateTimeElapsedMillisecond }
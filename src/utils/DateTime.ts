// return value is in seconds
const calculateTimeElapsed = (dayStart: Date): number => {
    return (new Date().getTime() - dayStart.getTime()) / 1000
}

const calculateTimeElapsedMillisecond = (prev: Date): number => {
    const now = (new Date())
    return now.getTime() - prev.getTime()
}

const formatToString = (seconds: number) => {
    // const hhmmss: string = new Date(seconds * 1000).toISOString().substr(11, 8)
    const hour = Math.floor(seconds/360)
    const min = Math.floor((seconds - hour * 360)/60)
    const sec = Math.floor(seconds - hour * 360 - min * 60)

    const formattedDate = `${hour > 0 ? `${hour}h` : ''} ${min > 0 || hour > 0 ? `${min}m` : ''} ${`${sec}s`}`
    return formattedDate
}

export { calculateTimeElapsed, calculateTimeElapsedMillisecond, formatToString }
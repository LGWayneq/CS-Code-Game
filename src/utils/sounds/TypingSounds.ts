import SOUND1 from '../../assets/sounds/typing/blue/mech-blue-single-1.mp3'
import SOUND2 from '../../assets/sounds/typing/blue/mech-blue-single-2.mp3'
import SOUND3 from '../../assets/sounds/typing/blue/mech-blue-single-3.mp3'
import SOUND4 from '../../assets/sounds/typing/blue/mech-blue-single-4.mp3'
import SOUND5 from '../../assets/sounds/typing/blue/mech-blue-single-5.mp3'
import SOUND6 from '../../assets/sounds/typing/blue/mech-blue-single-6.mp3'
import SOUND7 from '../../assets/sounds/typing/blue/mech-blue-single-7.mp3'
import SOUND8 from '../../assets/sounds/typing/blue/mech-blue-single-8.mp3'
import SOUND9 from '../../assets/sounds/typing/blue/mech-blue-single-9.mp3'
import SOUND10 from '../../assets/sounds/typing/blue/mech-blue-single-10.mp3'
import SOUND11 from '../../assets/sounds/typing/blue/mech-blue-single-11.mp3'
import SOUND12 from '../../assets/sounds/typing/blue/mech-blue-single-12.mp3'
import SOUND13 from '../../assets/sounds/typing/blue/mech-blue-single-13.mp3'
import SOUND14 from '../../assets/sounds/typing/blue/mech-blue-single-14.mp3'
import SOUND15 from '../../assets/sounds/typing/blue/mech-blue-single-15.mp3'

const TYPING_SOUNDS = [
    SOUND1,
    SOUND2,
    SOUND3,
    SOUND4,
    SOUND5,
    SOUND6,
    SOUND7,
    SOUND8,
    SOUND9,
    SOUND10,
    SOUND11,
    SOUND12,
    SOUND13,
    SOUND14,
    SOUND15,
]

export function playTypingSound(volume: number = 0.5) {
    const randomIndex = Math.floor(Math.random() * TYPING_SOUNDS.length)
    const audio = new Audio(TYPING_SOUNDS[randomIndex])
    audio.volume = volume
    audio.play()
}
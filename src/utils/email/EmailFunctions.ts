import emailjs from '@emailjs/browser'
import { EMAIL_KEYS } from './emailKeys'

const SERVICE_ID = EMAIL_KEYS.EMAILJS_SERVICE_ID
const BUG_REPORT_TEMPLATE_ID = EMAIL_KEYS.BUG_REPORT_TEMPLATE_ID
const FEEDBACK_TEMPLATE_ID = EMAIL_KEYS.FEEDBACK_TEMPLATE_ID
const PUBLIC_KEY = EMAIL_KEYS.EMAILJS_PUBLIC_KEY

export const sendBugReport = (form: any) => {
    emailjs.send(SERVICE_ID, BUG_REPORT_TEMPLATE_ID, form, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text)
        }, (error) => {
            console.log(error.text)
        })
}

export const sendFeedback = (form: any) => {
    emailjs.send(SERVICE_ID, FEEDBACK_TEMPLATE_ID, form, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text)
        }, (error) => {
            console.log(error.text)
        })
}
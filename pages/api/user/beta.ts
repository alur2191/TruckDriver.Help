import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    res.status(400)

}

const validateCaptcha = (response_key) => {
    return new Promise((resolve, reject) => {
        const secret_key = process.env.RECAPTCHA_SECRET

        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`

        fetch(url, {
        method: 'post'
        })
            .then((response) => response.json())
            .then((google_response) => {
                if (google_response.success == true) {
                    resolve(true)
                } else {
                    resolve(false)
                }
        })
        .catch((err) => {
            console.log(err)
            resolve(false)
        })
    })
}


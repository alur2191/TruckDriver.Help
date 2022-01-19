import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export

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

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { email, company, name, position } = req.body;
    if (!(await validateCaptcha(req.body['g-recaptcha-response']))) {
        return res.redirect(`/captcha`)
    }
    delete req.body['g-recaptcha-response']
    try {
        const beta = await prisma.beta.create({
            data: {
                company,
                mcnumber:parseInt(req.body.mcnumber),
                usdot:parseInt(req.body.usdot),
                phone:parseInt(req.body.phone),
                email,
                name,
                position,
            }
        })
        return res.status(200).send("OK");
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({error: "Ошибка при отправки заявки."})
    } finally {
        await prisma.$disconnect()
    }

}
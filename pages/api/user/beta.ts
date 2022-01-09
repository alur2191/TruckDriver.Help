import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
        if (result instanceof Error) {
            return reject(result)
        }

        return resolve(result)
        })
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors)
    const { body, method } = req;

    // Extract the email and captcha code from the request body
    const { email, captcha, company, name, position } = body;

    if (method === "POST") {
        // If email or captcha are missing return an error
        if (!email || !captcha) {
            return res.status(422).json({
                message: "Unproccesable request, please provide the required fields",
            });
        }

        try {
            // Ping the google recaptcha verify API to verify the captcha code you received
            const response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                    },
                    method: "POST",
                }
            );

            const captchaValidation = await response.json();

            if (captchaValidation.success) {
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
                    console.log('db part works')
                    return res.json({beta})
                } catch (e) {
                    console.log(e)
                    res.status(500)
                    res.json({error: "Ошибка при отправки заявки."})
                } finally {
                    await prisma.$disconnect()
                }
            }

            return res.status(422).json({
                message: "Unproccesable request, Invalid captcha code",
            });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ message: "Something went wrong" });
        }
    }
    // Return 404 if someone pings the API with a method other than
    // POST
    return res.status(404).send("Not found");
}
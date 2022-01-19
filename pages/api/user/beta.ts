import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'



// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
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
            /**
             * The structure of response from the veirfy API is
             * {
             *  "success": true|false,
             *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
             *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
             *  "error-codes": [...]        // optional
                }
                */
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
                    return res.status(200).send("OK");
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
















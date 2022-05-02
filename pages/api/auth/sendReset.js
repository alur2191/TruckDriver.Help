import sendgrid from "@sendgrid/mail";
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken';

export default async function (req, res) {
    const { email } = req.body
    const { sign } = jwt
    // Sign the token with JWT
    const token = sign({ email }, process.env.JWT_SECRET + email, {
        expiresIn: "1d"
    })

    try {
        // Pass the token to the DB
        const updateUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                token
            }
        })

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

        try {
            await sendgrid.send({
                // to: email,
                to: email,
                from: "noreply@truckdriver.help",
                subject: `Ссылка на восстановление доступа в аккаунт`,
                html: `<div>
                <p>Для востановления доступа на сайт пройдите по ссылке.</p>
                <p><a href="https://www.truckdriver.help/user/reset-password/${token}">https://www.truckdriver.help/user/reset-password/${token}</a></p>
                <p>Ссылка активна на 24 часа.</p>

                <p>Если Вы получили это письмо по ошибке, просто удалите его. Вы не будете подписаны на нашу рассылку если кликните по указанной ссылке.</p>
                <hr></hr>
                <p>To restore access to the site, follow the link.</p>
                <p><a href="https://www.truckdriver.help/user/reset-password/${token}">https://www.truckdriver.help/user/reset-password/${token} </a></p>
                <p>Link is active for 24 hours.</p>

                <p>If you received this email in error, just delete it. You will not be subscribed to our newsletter if you click on the link provided.</p>
            
                </div>

                </div>`,
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ error: error.message });
        }

        res.status(201).json({ message: "Ссылка послана" })
    } catch (e) {
        res.status(500);
        res.json({ message: 'Ошибка при создании компании.' })
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}
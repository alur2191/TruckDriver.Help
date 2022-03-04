import sendgrid from "@sendgrid/mail";
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken';

export default async function (req, res) {
    const { email } = req.body
    const { sign } = jwt

    const token = sign({ email }, process.env.SECRET + email, {
        expiresIn: "1d"
    })
    try {
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
                subject: `Востановить пароль.`,
                html: `<div>
                <p>Для востановления доступа на сайт пройдите по ссылке.</p>
                <p><a href="https://www.truckdriver.help/user/reset-password/${token}">https://www.truckdriver.help/user/reset-password/${token}</a></p>
                <p>Ссылка активна на 24 часа.</p>

                <p>Если Вы получили это письмо по ошибке, просто удалите его. Вы не будете подписаны на нашу рассылку если кликните по указанной ссылке.</p>
                
                </div>`,
            });
        } catch (error) {
            // console.log(error);
            return res.status(error.statusCode || 500).json({ error: error.message });
        }

        console.log(updateUser)
        res.status(201);
        res.json({ updateUser });
    } catch (e) {
        res.status(500);
        res.json({ error: 'Ошибка при создании компании.' })
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
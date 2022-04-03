

import prisma from '../../../lib/prisma'
import { hashPassword } from '../../../lib/auth'
import jwt from 'jsonwebtoken';
import sendgrid from "@sendgrid/mail";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    const { email, password } = req.body
    const { sign } = jwt;
    // email and password validation
    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
        res
            .status(422)
            .json({
                message: 'Invalid input - password should also be at least 7 characters long'
            })
        return
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    // check if user exists
    if (existingUser) {
        if (existingUser.activated) {
            // if activated, error: user exists
            res.status(422).json({ message: 'Пользователь с этой электронной почтой уже существует.' })
        } else {
            // if not, error: activate account
            res.status(422).json({ message: 'Подтвердите свою электронную почту.' })
        }
        return
    }

    const hashedPassword = await hashPassword(password)
    // sign token with JWT
    const token = sign({ email }, process.env.JWT_SECRET + email, {
        expiresIn: "1d"
    })

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        await sendgrid.send({
            // to: email,
            to: email,
            from: "noreply@truckdriver.help",
            subject: `Confirmation Email.`,
            html: `<div>
                <p>Здравствуйте, </p>
                <p>Некий пользователь сайта www.TruckDriver.help указал Вашу электронную почту при регистрации.</p>
                <p>Для того чтобы активировать аккаунт необходимо подтвердить электронную почту нажав на ссылку.</p>
                <p><a href="https://www.truckdriver.help/user/verify/${token}">https://www.truckdriver.help/user/verify/${token}</a></p>
                <p>Ссылка активна на 24 часа.</p>
                
                <p>Если Вы получили это письмо по ошибке, просто удалите его. Вы не будете подписаны на нашу рассылку если кликните по указанной ссылке.</p>
                
                <hr></hr>
                <p>Hello,</p>
                <p>Someone on www.TruckDriver.help provided your email during registration process.</p>
                <p>In order to activate your account, you need to confirm your email by clicking on the link.</p>
                <p><a href="https://www.truckdriver.help/user/verify/${token}">https://www.truckdriver.help/user/verify/${token}</a> </p>
                <p>Link is active for 24 hours.</p>
                
                <p>If you received this email in error, just delete it. You will not be subscribed to our newsletter if you click on the link provided.</p>
            </div>`,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        res.status(201)
        res.json({ user })
    } catch (e) {
        res.status(500)
        res.json({ error: "Ошибка при создании заявки." })
    } finally {
        await prisma.$disconnect()
    }

}
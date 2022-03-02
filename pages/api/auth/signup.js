

import prisma from '../../../lib/prisma'
import { hashPassword } from '../../../lib/auth'
import jwt from 'jsonwebtoken';
import sendgrid from "@sendgrid/mail";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    const { email, password } = req.body
    const { sign } = jwt;

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

    if (existingUser) {
        if (existingUser.activated) {
            res.status(422).json({ message: 'Пользователь с этой электронной почтой уже существует.' })
        } else {
            res.status(422).json({ message: 'Подтвердите свою электронную почту.' })
        }
        return
    }

    const hashedPassword = await hashPassword(password)

    const token = sign({ email }, process.env.SECRET + email, {
        expiresIn: "1d"
    })

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        await sendgrid.send({
            // to: email,
            to: email,
            from: "noreply@truckdriver.help",
            subject: `Письмо с подтверждением.`,
            html: `<div>
            <p>Здравствуйте, </p>
            <p>Некий пользователь сайта www.TruckDriver.help указал Вашу электронную почту при регистрации.</p>
            <p>Для того чтобы активировать аккаунт необходимо подтвердить электронную почту нажав на ссылку.</p>
            <p><a href="https://www.truckdriver.help/user/verify/${token}">https://www.truckdriver.help/user/verify/${token}</a></p>
            <p>Ссылка активна на 24 часа.</p>
            
            <p>Если Вы получили это письмо по ошибке, просто удалите его. Вы не будете подписаны на нашу рассылку если кликните по указанной ссылке.</p>
            
            </div>`,
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        // try{
        //     const notification = await prisma.notification.create({
        //         data: {
        //             title: "Добро пожаловать!",
        //             message:'Вы успешно зарегистрировались!',
        //             user: {
        //                 connect: {
        //                     id: user.id
        //                 }
        //             }
        //         }
        //     })
        //     console.log(notification)
        // }catch(e){
        //     console.log("Не удалось отправить оповещание")
        // }
        res.status(201)
        res.json({ user })
    } catch (e) {
        res.status(500)
        res.json({ error: "Ошибка при создании заявки." })
    } finally {
        await prisma.$disconnect()
    }

}
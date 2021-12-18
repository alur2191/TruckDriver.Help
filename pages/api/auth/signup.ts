

import { NextApiRequest, NextApiResponse } from "next"
import {PrismaClient } from "@prisma/client"
import {hashPassword} from '../../../lib/auth'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]})
    const {email, password} = req.body

    if (!email || !email.includes('@') || !password || password.trim().length < 7){
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
        res.status(422).json({message: 'User already exists'})
        return
    }

    const hashedPassword = await hashPassword(password)

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password:hashedPassword
            }
        })

        res.status(201)
        res.json({user})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при создании заявки."})
    } finally {
        await prisma.$disconnect()
    }

}
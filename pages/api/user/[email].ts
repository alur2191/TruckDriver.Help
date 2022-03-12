/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await prisma.user.findUnique({
            where:{
                email:req.query.email as string || ''
            },
            select: {
                activated:true,
                id:true,
                email:true,
                company:true
            }
        })
        res.status(200)
        res.json({user})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе пользователя."})
    } finally {
        await prisma.$disconnect()
    }

}
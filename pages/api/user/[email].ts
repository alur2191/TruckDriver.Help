import { NextApiRequest, NextApiResponse } from "next"
import {PrismaClient } from "@prisma/client"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]})
    try {
        const user = await prisma.user.findUnique({
            where:{
                email:req.query.email as string || ''
            },
            select: {
                activated:true,
                id:true,
                email:true,
                company:true,
                saved_jobs:true
            }
        })
        res.status(200)
        res.json({user})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе спика пользователя."})
    } finally {
        await prisma.$disconnect()
    }

}
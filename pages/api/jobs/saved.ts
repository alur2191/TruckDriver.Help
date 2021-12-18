import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        const jobs = await prisma.job.findMany({
            where: {
                id: {in: [...req.body.ids]}
            }
        })
        res.status(200)
        res.json({jobs})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе спика работ."})
    } finally {
        await prisma.$disconnect()
    }

}
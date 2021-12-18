import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        const companies = await prisma.company.findMany()
        res.status(200)
        res.json({companies})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе спика работ."})
    } finally {
        await prisma.$disconnect()
    }

}
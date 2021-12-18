import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        const job = await prisma.job.findUnique({
            where :{
                id: req.body.id
            },
            include:{
                company: {
                    include: {
                        trucks: true,
                        trailers:true
                    }
                }
            }
        })
        res.status(200)
        res.json({job})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе спика работ."})
    } finally {
        await prisma.$disconnect()
    }

}
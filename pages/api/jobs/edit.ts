import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const job = await prisma.job.update({
            where: {
                id: parseInt(req.body.jobId)
            },
            data: {
                truck: req.body.truck,
                type: req.body.type,
                salary_mile:parseInt(req.body.pay),
                salary_gross:parseInt(req.body.driverGross),
                owner_gross:parseInt(req.body.ownerGross)
            }
        })

        res.status(201)
        res.json({job})
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({error: "Ошибка при создании заявки."})
    } finally {
        await prisma.$disconnect()
    }

}
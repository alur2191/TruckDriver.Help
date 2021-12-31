import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const beta = await prisma.beta.create({
            data: {
                company:req.body.company,
                mcnumber:parseInt(req.body.mcnumber),
                usdot:parseInt(req.body.usdot),
                phone:parseInt(req.body.phone),
                email:req.body.email,
                name:req.body.name,
                position:req.body.position,
            }
        })

        res.status(201)
        res.json({beta})
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({error: "Ошибка при отправки заявки."})
    } finally {
        await prisma.$disconnect()
    }

}
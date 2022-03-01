import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { trailer,id }= req.body
    try {
        await prisma.trailer.deleteMany({
            where:{
                company_id: id
            }
        })

        const addTrailers = await prisma.trailer.createMany({
            data: [
                ...trailer
            ]
        })
        res.status(201);
        res.json({addTrailers});
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при создании компании.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { truck,id }= req.body
    try {
        await prisma.truck.deleteMany({
            where:{
                company_id: id
            }
        })

        const addTrucks = await prisma.truck.createMany({
            data: [
                ...truck
            ]
        })
        console.log(truck);
        res.status(201);
        res.json({addTrucks});
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при создании компании.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
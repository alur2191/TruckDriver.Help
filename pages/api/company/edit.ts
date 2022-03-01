import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { about,additional,parking,id }= req.body
    try {

        console.log(about)
        console.log(additional)
        console.log(parking)
        const updateCompany = await prisma.company.update({
            where:{
                id
            },
            data:{
                ...about,
                ...additional,
                parking:parking
            }
        })
        console.log(updateCompany)
        res.status(201);
        res.json({updateCompany});
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при создании компании.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
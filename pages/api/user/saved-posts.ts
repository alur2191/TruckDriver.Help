

import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        try {
            
            const jobs = await prisma.userJobs.findMany({
                where:{
                    userId:parseInt(req.body.userId)
                },
                select: {
                    job:true
                }
            })
            console.log(jobs);
            res.status(200)
            res.json({jobs})
        } catch (err) {
            console.log('fail: ',err);
        }        
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при сохранении поста.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
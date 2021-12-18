

import { NextApiRequest, NextApiResponse } from "next";
import {PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    try {
        try {
            console.log('email: ', req.body.email,'. jobId: ',req.body.job)
            const user = await prisma.user.update({
                where: {
                    email: req.body.email,
                },
                data: {
                    saved_jobs:{
                        push:[req.body.job]
                    }
                },
                
            })
            console.log('update done');
            res.status(200)
            res.json({user})
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
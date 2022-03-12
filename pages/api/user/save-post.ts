

import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await prisma.user.update({
            where: {
                email: req.body.email,
            },
            data: {
                savedJobs:{
                    create: [
                        {
                            job: {
                                connect:{
                                    id:parseInt(req.body.job)
                                }
                            }
                        }
                    ]
                }
            },
            
        })
        res.status(200)
        res.json({user})    
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при сохранении поста.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { name,mcnumber,usdot,phone,website,city,state,zip,dispatch24,insurance,deposit,parkingList,filteredTruckList,filteredTrailerList,email}= req.body

    try {
        const company = await prisma.company.create({
            data: {
                name,
                mcnumber,
                usdot,
                phone,
                website,
                city,
                state,
                zip,
                dispatch24,
                insurance,
                deposit,
                parking:parkingList,
                trucks: {
                    createMany:{
                        data:[
                            ...filteredTruckList
                        ]
                    }
                },
                trailers: {
                    createMany:{
                        data:[
                            ...filteredTrailerList
                        ]
                    }
                },
                user:{
                    connect: {
                        email
                    }
                }
            }
        });
        res.status(201);
        res.json({company});
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при создании компании.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}
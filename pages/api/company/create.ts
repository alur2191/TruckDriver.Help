import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'
export default async function (req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const company = await prisma.company.create({
            data: {
                name: req.body.name,
                mcnumber:parseInt(req.body.mcnumber),
                usdot:parseInt(req.body.usdot),
                phone: req.body.phone,
                website: req.body.site,
                deposit: parseInt(req.body.deposit),
                city:req.body.city,
                state:req.body.state,
                zip:parseInt(req.body.zip),
                dispatch24:req.body.dispatch24,
                insurance:req.body.insurance,
                trucks: {
                    create: [{
                        manufacturer: req.body.manufacturer,
                        lease:req.body.truckLease,
                        year_from: parseInt(req.body.yearFrom),
                        year_to: parseInt(req.body.yearTo),
                        transmission: req.body.transmission
                    }]
                },
                trailers: {
                    create: [{
                        trailer_type:req.body.trailerType,
                        lease:req.body.trailerLease,
                        year_from:parseInt(req.body.trailerYearFrom),
                        year_to:parseInt(req.body.trailerYearTo)
                    }]
                },
                user:{
                    connect: {
                        email: req.body.email
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
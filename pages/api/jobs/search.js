import {PrismaClient } from "@prisma/client"

async function handler(req, res) {
    const prisma = new PrismaClient({log: ["query"]})
    const salaryMile = req.body.salaryMile?parseInt(req.body.salaryMile):undefined
    const salaryGross = req.body.salaryGross?parseInt(req.body.salaryGross):undefined
    const ownerGross = req.body.ownerGross?parseInt(req.body.ownerGross):undefined
    console.log('salaryGross: ',salaryGross,'salaryMile: ',salaryMile,'ownerGross: ',ownerGross);
    const options = () => {
        return salaryGross?{
            salary_gross:{
                equals: salaryGross
            }
        }:null,
        salaryMile?{
            salary_mile:{
                equals: salaryMile
            }
        }:null,ownerGross?{
            owner_gross:{
                equals: ownerGross
            }
        }:null
    }
    try {
        const jobs = await prisma.job.findMany({
            where: {
                AND: [
                    {
                        type: {
                            contains: req.body.type,
                        }
                    },
                    {
                        company:{
                            state: {
                                contains: req.body.state 
                            }
                        }
                    },
                    {
                        salary_mile:{
                            gte: salaryMile
                        }
                    },
                    {
                        salary_gross:{
                            gte: salaryGross
                        }
                    },
                    {
                        owner_gross:{
                            gte: ownerGross
                        }
                    }
                    
                ]
            },
            include:{
                company:true
            }
        })
        console.log(jobs);
        res.status(200)
        res.json({jobs})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе спика работ."})
    } finally {
        await prisma.$disconnect()
    }

}

export default handler
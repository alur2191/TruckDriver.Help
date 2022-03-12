import prisma from '../../../lib/prisma'

async function handler(req, res) {
    const salaryMile = req.body.salaryMile ? parseFloat(req.body.salaryMile) : undefined
    const salaryGross = req.body.salaryGross ? parseInt(req.body.salaryGross) : undefined
    const ownerGross = req.body.ownerGross ? parseInt(req.body.ownerGross) : undefined
    const teamPay = req.body.teamPay ? parseInt(req.body.teamPay) : undefined
    const teamDriverGross = req.body.teamDriverGross ? parseInt(req.body.teamDriverGross) : undefined

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
                        company: {
                            AND: [
                                {
                                    state: {
                                        contains: req.body.state
                                    },
                                },
                            ]
                        }
                    },
                    {
                        pay: {
                            gte: salaryMile
                        }
                    },
                    {
                        driverGross: {
                            gte: salaryGross
                        }
                    },
                    {
                        teamPay: {
                            gte: teamPay
                        }
                    },
                    {
                        teamDriverGross: {
                            gte: teamDriverGross
                        }
                    },
                    {
                        ownerGross: {
                            gte: ownerGross
                        }
                    }

                ]
            },
            include: {
                company: true,
            }
        })
        res.status(200)
        res.json({ jobs })
    } catch (e) {
        res.status(500)
        res.json({ error: "Ошибка при запросе спика работ." })
    } finally {
        await prisma.$disconnect()
    }

}

export default handler
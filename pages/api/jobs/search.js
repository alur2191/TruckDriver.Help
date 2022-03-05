import prisma from '../../../lib/prisma'

async function handler(req, res) {
    console.log(req.body);
    const salaryMile = req.body.salaryMile ? parseFloat(req.body.salaryMile) : undefined
    const salaryGross = req.body.salaryGross ? parseInt(req.body.salaryGross) : undefined
    const ownerGross = req.body.ownerGross ? parseInt(req.body.ownerGross) : undefined
    const teamPay = req.body.teamPay ? parseInt(req.body.teamPay) : undefined
    const teamDriverGross = req.body.teamDriverGross ? parseInt(req.body.teamDriverGross) : undefined
    // console.log('salaryGross: ', salaryGross, 'salaryMile: ', salaryMile, 'ownerGross: ', ownerGross);
    // const options = () => {
    //     return salaryGross ? {
    //         driverGross: {
    //             equals: salaryGross
    //         }
    //     } : null,
    //         salaryMile ? {
    //             pay: {
    //                 equals: salaryMile
    //             }
    //         } : null, ownerGross ? {
    //             ownerGross: {
    //                 equals: ownerGross
    //             }
    //         } : null
    // }
    const options = () => {
        return req.body.insurance ? {
            company: {
                insurance: true
            }
        } : null,
            req.body.dispatch24 ? {
                company: {
                    dispatch24: true
                }
            } : null
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
                        company: {
                            state: {
                                contains: req.body.state
                            }
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
                    }, options

                    // {
                    //     company: {
                    //         parking: {
                    //             has: req.body.parkingState
                    //         }
                    //     }
                    // },
                    // {
                    //     company: {
                    //         truck: {
                    //             lease: req.body.lease
                    //         }
                    //     }
                    // }
                    // {
                    //     truck: {
                    //         lease: {
                    //             contains: req.body.lease
                    //         }
                    //     }
                    // },

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
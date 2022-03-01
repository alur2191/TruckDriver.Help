import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    try {
        let pay = null
        let teamPay = null
        typeof req.body.pay === "string" ? pay = parseFloat(req.body.pay) : pay = req.body.pay
        typeof req.body.teamPay === "string" ? teamPay = parseFloat(req.body.teamPay) : teamPay = req.body.teamPay
        const job = await prisma.job.create({
            data: {
                type: req.body.type,
                pay,
                driverGross: req.body.driverGross,
                ownerGross: req.body.ownerGross,
                teamPay,
                teamDriverGross: req.body.teamDriverGross,
                teamOwnerGross: req.body.teamOwnerGross,
                company: {
                    connect: {
                        id: req.body.companyId
                    }
                }
            }
        })

        res.status(201)
        res.json({ job })
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({ error: "Ошибка при создании заявки." })
    } finally {
        await prisma.$disconnect()
    }

}
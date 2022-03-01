import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    const { id, type, driverGross, ownerGross, teamDriverGross, teamOwnerGross } = req.body
    let pay = null
    let teamPay = null
    typeof req.body.pay === "string" ? pay = parseFloat(req.body.pay) : pay = req.body.pay
    typeof req.body.teamPay === "string" ? teamPay = parseFloat(req.body.teamPay) : teamPay = req.body.teamPay
    try {
        const job = await prisma.job.update({
            where: {
                id
            },
            data: {
                type,
                pay,
                teamPay,
                driverGross,
                ownerGross,
                teamDriverGross,
                teamOwnerGross,
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
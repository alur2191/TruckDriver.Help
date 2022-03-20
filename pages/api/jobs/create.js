import prisma from '../../../lib/prisma'
import { Telegraf } from 'telegraf'
const tg = new Telegraf(process.env.TG_BOT_TOKEN);
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

        const message = `Работа на <b>${req.body.type}</b>\n
        ${pay ? `<b>Driver Pay:</b>$ ${pay.toFixed(2)}\n` : ""}
        ${req.body.driverGross ? `<b>Driver Gross:</b> ${req.body.driverGross}% \n` : ''}
        ${teamPay ? `<b>Team Pay:</b> $ ${teamPay.toFixed(2)} \n` : ''} 
        ${req.body.teamDriverGross ? `<b>Team Gross:</b> ${req.body.teamDriverGross}% \n` : ''}
        ${req.body.ownerGross ? `<b>Owner Gross:</b> ${req.body.ownerGross}% \n` : ''}
        ${req.body.teamOwnerGross ? `<b>Owner Team Gross:</b> ${req.body.teamOwnerGross}% \n` : ''}
        <a href="https://www.truckdriver.help/jobs/${job.id}">Узнать подробнее.</a>`

        await tg.telegram.sendMessage("@truckdriverhelp", message, { parse_mode: 'HTML' })

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
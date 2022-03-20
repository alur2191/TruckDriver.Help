import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    try {
        const job = await prisma.job.delete({
            where: {
                id: req.body.id
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
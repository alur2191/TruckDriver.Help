import prisma from '../../../lib/prisma'
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    console.log('working');
    try {
        const notification = await prisma.notification.create({
            data: {
                message: req.body.message,
                user: {
                    connect: {
                        id: req.body.id
                    }
                }
            }
        })

        res.status(201)
        res.json({ notification })
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({ error: "Ошибка при создании заявки." })
    } finally {
        await prisma.$disconnect()
    }

}